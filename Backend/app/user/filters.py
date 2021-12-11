from django_filters.rest_framework import DjangoFilterBackend
from django_filters import FilterSet
from django_filters import rest_framework as filters
from user.models import Store


class StoreFilter(FilterSet):
    """Filter for an item"""
    storecategory = filters.CharFilter('storecategory__slug')

    class Meta:
        models = Store
        fields = ('storecategory',)