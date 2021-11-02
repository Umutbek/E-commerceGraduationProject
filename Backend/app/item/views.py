from rest_framework import viewsets, permissions

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics

from item import models, serializers, functions
from django.shortcuts import get_object_or_404

from django.db.models import Sum, Count, F, Q
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class CategoryViewSet(viewsets.ModelViewSet):
    """Manage category"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = serializers.CategorySerializer
    queryset = models.Category.objects.all()
    pagination_class = None


class SubcategoryViewSet(viewsets.ModelViewSet):
    """Manage subcategory"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = serializers.SubcategorySerializer
    queryset = models.Subcategory.objects.all()
    pagination_class = None


class SubSubcategoryViewSet(viewsets.ModelViewSet):
    """Manage subsubcategory"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = serializers.SubSubcategorySerializer
    queryset = models.SubSubcategory.objects.all()
    pagination_class = None


class ItemViewSet(viewsets.ModelViewSet):
    """Manage item"""
    queryset = models.Item.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return serializers.GetItemSerializer

        return serializers.ItemSerializer


class CartViewSet(viewsets.ModelViewSet):
    """Manage Cart(Busket)"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    queryset = models.ModelCart.objects.all()
    pagination_class = None

    def get_queryset(self):
        return self.queryset.filter(clientid=self.request.user).order_by('-id')

    def get_serializer_class(self):
        if self.action == 'create':
            return serializers.ModelPostCartSerializer
        return serializers.ModelCartSerializer


    def create(self, request, *args, **kwargs):
        serializer = serializers.ModelPostCartSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        functions.create_cart(self, serializer)

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        cart = self.get_object()
        if cart:
            for i in cart.listitem.all():
                i.delete()
            cart.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ClientOrderViewSet(viewsets.ModelViewSet):
    """Manage clientorder"""
    serializer_class = serializers.ClientOrderSerializer
    queryset = models.ModelOrder.objects.all().order_by('-id')

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return serializers.GetClientOrderSerializer
        return serializers.ClientOrderSerializer

