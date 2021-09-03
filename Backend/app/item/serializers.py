from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers, exceptions
from django.conf import settings
from item import models
from user.models import Store
from django.utils.translation import ugettext_lazy as _


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
        fields = ('id', 'name', 'description', 'cost', 'category',
                  'subcategory', 'subsubcategory', 'supplier', 'issale', 'discount', 'publishDate')
        read_only_fields = ('id',)


class GetItemSerializer(serializers.ModelSerializer):
    """Serializer for Item"""
    class Meta:
        model = models.Item
        fields = ('id', 'name', 'description', 'cost', 'category',
                  'subcategory', 'subsubcategory', 'supplier', 'issale', 'discount', 'publishDate')
        read_only_fields = ('id',)
        depth=1
