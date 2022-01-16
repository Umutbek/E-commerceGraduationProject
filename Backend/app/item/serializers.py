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
        fields = ('id', 'nameEn', 'nameTr', 'icon', 'slug', 'supplier')
        read_only_fields = ('id',)


class SubcategorySerializer(serializers.ModelSerializer):
    """Serializer for sub category"""
    class Meta:
        model = models.Subcategory
        fields = ('id', 'nameEn', 'nameTr', 'category', 'slug')
        read_only_fields = ('id',)


class SubSubcategorySerializer(serializers.ModelSerializer):
    """Serializer for sub sub category"""
    class Meta:
        model = models.SubSubcategory
        fields = ('id', 'nameEn', 'nameTr', 'subcategory', 'slug')
        read_only_fields = ('id',)


class ItemSerializer(serializers.ModelSerializer):
    """Serializer for Item"""
    views = serializers.SerializerMethodField()

    class Meta:
        model = models.Item
        fields = ('id', 'name', 'uniqueid', 'description', 'cost', 'category', 'image', 'views',
                  'subcategory', 'subsubcategory', 'supplier', 'issale', 'discount',
                  'publishDate', 'quantity')
        read_only_fields = ('id',)

    def get_views(self, obj):
        return obj.item_views.count()


class GetItemSerializer(serializers.ModelSerializer):
    """Serializer for Item"""
    views = serializers.IntegerField(read_only=True)

    class Meta:
        model = models.Item
        fields = ('id', 'name', 'uniqueid', 'description', 'cost', 'category', 'image', 'slug', 'views',
                  'subcategory', 'subsubcategory', 'supplier', 'issale', 'discount',
                  'publishDate', 'quantity')
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
        fields = ('id', 'listitem', 'clientid', 'storeid', 'check', 'total_price', 'isavailable')
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
    cart = ModelCartSerializer()

    class Meta:
        model = models.ModelOrder
        fields = (
            'id', 'clientId', 'storeId', 'ordertype', 'totalprice',
            'address', 'declinereason', 'status',
            'comment', 'date', 'cart'
        )
        read_only_fields = ('id',)


class UserFavouriteItemsSerializer(serializers.ModelSerializer):
    """User favourite items """
    class Meta:
        model = models.UserFavouriteItems
        fields = ('id', 'item', 'user')
        read_only_fields = ('id',)


class UserFavouriteItemsDetailSerializer(serializers.ModelSerializer):
    """User favourite items in detail, open fk"""
    item = ItemSerializer()
    user = RegularAccountSerializer()

    class Meta:
        model = models.UserFavouriteItems
        fields = ('id', 'item', 'user')
        read_only_fields = ('id',)


class GetUserFavItemSerializer(serializers.ModelSerializer):
    """Serializer for Item"""
    isfavourite = serializers.BooleanField(default=True)
    views = serializers.SerializerMethodField()

    class Meta:
        model = models.Item
        fields = (
            'id', 'name', 'description', 'category', 'subcategory', 'isfavourite',
            'subsubcategory', 'cost', 'supplier', 'views', 'image',
            )

    def get_views(self, obj):
        return obj.item_views.count()


class RemoveItemNewSerializer(serializers.Serializer):
    """Remove item from cart"""
    item = serializers.IntegerField()
    cart = serializers.IntegerField()

    def save(self):
        item = self.validated_data['item']
        cart = self.validated_data['cart']