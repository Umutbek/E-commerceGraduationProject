from django_filters.rest_framework import DjangoFilterBackend
from django_filters import FilterSet
from django_filters import rest_framework as filters
from item import models
from django.db.models import Q


class ItemFilter(FilterSet):
    """Filter for an item"""
    category_id = filters.CharFilter('category')
    subcategory_id = filters.CharFilter('subcategory')
    subsubcategory_id = filters.CharFilter('subsubcategory')
    category_slug = filters.CharFilter('category__slug')
    subcategory_slug = filters.CharFilter('subcategory__slug')
    subsubcategory_slug = filters.CharFilter('subsubcategory__slug')
    supplier = filters.CharFilter('supplier__slug')
    min_cost= filters.CharFilter(field_name="cost",lookup_expr='gte')
    max_cost= filters.CharFilter(field_name="cost",lookup_expr='lte')

    class Meta:
        models = models.Item
        fields = ('category_id', 'subcategory_id', 'subsubcategory_id',
                  'category_slug', 'subcategory_slug', 'subsubcategory_slug',
                  'min_cost', 'max_cost', 'supplier')


class CategoryFilter(FilterSet):
    """Filter for an item"""
    store = filters.CharFilter('supplier__slug')

    class Meta:
        models = models.Category
        fields = ('store',)


class SubCategoryFilter(FilterSet):
    """Filter for an item"""
    category = filters.CharFilter('category')
    category_slug = filters.CharFilter('category__slug')

    class Meta:
        models = models.Subcategory
        fields = ('category', 'category_slug')


class SubSubCategoryFilter(FilterSet):
    """Filter for an item"""
    subcategory = filters.CharFilter('subcategory')
    subcategory_slug = filters.CharFilter('subcategory__slug')

    class Meta:
        models = models.SubSubcategory
        fields = ('subcategory', 'subcategory_slug')

