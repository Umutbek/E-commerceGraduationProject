from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers, exceptions
from django.conf import settings
from item import models
from user.models import Store
from django.utils.translation import ugettext_lazy as _
from user.serializers import RegularAccountSerializer, StoreSerializer


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for category"""
    class Meta:
        model = models.Category
        fields = ('id', 'nameEn', 'nameTr', 'icon')
        read_only_fields = ('id',)


class SubcategorySerializer(serializers.ModelSerializer):
    """Serializer for sub category"""
    class Meta:
        model = models.Subcategory
        fields = ('id', 'nameEn', 'nameTr', 'category')
        read_only_fields = ('id',)


class SubSubcategorySerializer(serializers.ModelSerializer):
    """Serializer for sub sub category"""
    class Meta:
        model = models.SubSubcategory
        fields = ('id', 'nameEn', 'nameTr', 'subcategory')
        read_only_fields = ('id',)


class ItemSerializer(serializers.ModelSerializer):
    """Serializer for Item"""
    class Meta:
        model = models.Item
        fields = ('id', 'name', 'description', 'cost', 'category', 'image',
                  'subcategory', 'subsubcategory', 'supplier', 'issale', 'discount', 'publishDate')
        read_only_fields = ('id',)


class GetItemSerializer(serializers.ModelSerializer):
    """Serializer for Item"""
    class Meta:
        model = models.Item
        fields = ('id', 'name', 'description', 'cost', 'category', 'image',
                  'subcategory', 'subsubcategory', 'supplier', 'issale', 'discount', 'publishDate')
        read_only_fields = ('id',)
        depth=1


class QuantityItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ItemWithQuantity
        fields = ('id', 'item', 'total', 'quantity')
        depth = 1


class ModelCartSerializer(serializers.ModelSerializer):
    listitem = QuantityItemSerializer(many=True)
    clientid = RegularAccountSerializer()
    storeid = StoreSerializer()

    """Get cart(busket)"""
    class Meta:
        model = models.ModelCart
        fields = ('id', 'listitem', 'clientid', 'storeid', 'check', 'total_price')
        read_only_fields = ('id',)


class ModelPostCartSerializer(serializers.Serializer):
    """Create new cart"""
    itemid = serializers.IntegerField()
    client = serializers.IntegerField()
    store = serializers.IntegerField()

    def save(self):
        itemid = self.validated_data['itemid']
        client = self.validated_data['client']
        store = self.validated_data['store']


class ClientOrderSerializer(serializers.ModelSerializer):
    """Serializer for client order"""
    class Meta:
        model = models.ModelOrder
        fields = (
            'id', 'clientId', 'storeId', 'ordertype', 'totalprice',
            'address', 'declinereason', 'status',
            'comment', 'date', 'cart'
        )
        read_only_fields = ('id',)


class GetClientOrderSerializer(serializers.ModelSerializer):
    """Serializer for client order"""
    storeId = StoreSerializer()
    clientId = RegularAccountSerializer()
    cart = QuantityItemSerializer()

    class Meta:
        model = models.ModelOrder
        fields = (
            'id', 'clientId', 'storeId', 'ordertype', 'totalprice',
            'address', 'declinereason', 'status',
            'comment', 'date', 'cart'
        )
        read_only_fields = ('id',)