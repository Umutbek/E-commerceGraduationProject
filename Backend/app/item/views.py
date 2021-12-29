from rest_framework import viewsets, permissions

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics

from item import models, serializers, functions
from django.shortcuts import get_object_or_404

from django.db.models import Sum, Count, F, Q
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters import FilterSet
from django_filters import rest_framework as filters
from item import filters
from .service import get_client_ip
from collections import OrderedDict
from rest_framework import pagination
from rest_framework.pagination import PageNumberPagination


class FooPagination(pagination.PageNumberPagination):

    def get_paginated_response(self, data, diction):
        return Response(OrderedDict([
            ('count', self.page.paginator.count),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('data', diction), # add the 'custom' field
            ('results', data),
        ]))


class CategoryViewSet(viewsets.ModelViewSet):
    """Manage category"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = serializers.CategorySerializer
    queryset = models.Category.objects.all()

    filter_backends = (DjangoFilterBackend,)
    filter_class = filters.CategoryFilter

    pagination_class = None


class SubcategoryViewSet(viewsets.ModelViewSet):
    """Manage subcategory"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = serializers.SubcategorySerializer
    queryset = models.Subcategory.objects.all()

    filter_backends = (DjangoFilterBackend,)
    filter_class = filters.SubCategoryFilter

    pagination_class = None


class SubSubcategoryViewSet(viewsets.ModelViewSet):
    """Manage subsubcategory"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = serializers.SubSubcategorySerializer
    queryset = models.SubSubcategory.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filter_class = filters.SubSubCategoryFilter

    pagination_class = None


class ItemViewSet(viewsets.ModelViewSet):
    """Manage item"""
    queryset = models.Item.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filter_class = filters.ItemFilter

    ordering_fields = ('views', 'cost',)
    search_fields = ('name',)
    pagination_class = FooPagination
    lookup_field = 'slug'

    def get_queryset(self):
        """Retrieve the favourite stores for the authenticated user only"""

        item = self.queryset.all().order_by('?').annotate(
            views=Count('item_views')
        ).annotate(
            isfavourite=Count("fav_items",
                                     filter=Q(fav_items__user=self.request.user.id))
        )

        return item


    def get_paginated_response(self, data, diction):
        """
        Return a paginated style `Response` object for the given output data.
        """
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data, diction)


    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        category = self.request.query_params.get('category_slug')
        subcategory = self.request.query_params.get('subcategory_id')
        subsubcategory = self.request.query_params.get('subsubcategory_id')
        supplier = self.request.query_params.get('supplier')

        mylist = functions.filtered_params(category, subcategory, subsubcategory)
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data, mylist)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return serializers.GetItemSerializer

        return serializers.ItemSerializer


    def retrieve(self, request, *args, **kwargs):
        item = self.get_object()
        print(item.name)
        ip = get_client_ip(self.request)
        if models.IpModel.objects.filter(ip=ip).exists():
            item.item_views.add(models.IpModel.objects.get(ip=ip))
        else:
            models.IpModel.objects.create(ip=ip)
            item.item_views.add(models.IpModel.objects.get(ip=ip))

        item.views = item.item_views.count()
        item.save()

        serializer = serializers.GetItemSerializer(item)
        return Response(serializer.data)


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

    def create(self, request, *args, **kwargs):
        serializer = serializers.ClientOrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        saved_data = serializer.save()
        functions.create_order_in_firebase(saved_data, self.request.user.username)
        return Response(serializer.data)


class RemoveItem(APIView):
    serializer_class = serializers.RemoveItemNewSerializer

    def post(self, request):
        serializer = serializers.RemoveItemNewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        cart = serializer.validated_data['cart']
        item = serializer.validated_data['item']
        usercart = models.ModelCart.objects.filter(id=cart).first()
        if usercart:
            for i in usercart.listitem.all():

                if item == i.item.id and i.quantity>1:
                    i.quantity = i.quantity - 1
                    i.save()
                elif item == i.item.id and i.quantity == 1:
                    if usercart.listitem.count() == 1:
                        usercart.delete()
                        break
                    i.delete()
            return Response({"Success": True})
        else:
            return Response({"Success": False})


class RemoveItemAll(APIView):
    serializer_class = serializers.RemoveItemNewSerializer

    def post(self, request):
        serializer = serializers.RemoveItemNewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        cart = serializer.validated_data['cart']
        item = serializer.validated_data['item']
        usercart = models.ModelCart.objects.filter(id=cart).first()
        if usercart:
            for i in usercart.listitem.all():

                if item == i.item.id and usercart.listitem.count() == 1:
                    usercart.delete()
                    i.delete()
                    break

                elif item == i.item.id and usercart.listitem.count() > 1:
                    i.delete()
                    break

            return Response({"success": True})
        else:
            return Response({"success": False})


class UserFavouriteView(APIView):
    """API view for user favourite items"""
    serializer_class = serializers.UserFavouriteItemsSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        """Create user favourite item"""
        serializer = serializers.UserFavouriteItemsSerializer(data=request.data)
        if serializer.is_valid():
            saved_data = serializer.save()
            itemm = models.Item.objects.get(id=saved_data.item.id)
            itemserializer = serializers.GetUserFavItemSerializer(itemm)
            return Response(itemserializer.data)
        else:
            return Response(serializer.errors,
                status=status.HTTP_400_BAD_REQUEST)


class GetUserFavouriteView(generics.ListAPIView):
    """Get user favourite items"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = serializers.UserFavouriteItemsDetailSerializer
    queryset = models.UserFavouriteItems.objects.all()

    def get_queryset(self):
        """Return object for the current authenticated user only"""
        print("User", self.request.user)
        return self.queryset.filter(user=self.request.user)


class GetUserFavouriteDetailView(APIView):
    """APIView for userfavourite detail list"""
    serializer_class = serializers.UserFavouriteItemsDetailSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    lookup_field = 'item'

    def get(self, request, item):
        """Return list of fav items detail"""
        favor = models.UserFavouriteItems.objects.filter(item=item) & models.UserFavouriteItems.objects.filter(user=request.user)
        if favor:
            for i in favor:
                serializer = serializers.UserFavouriteItemsDetailSerializer(i)
                return Response(serializer.data)
        return Response({'detail': 'No favourite item with this id'}, status=status.HTTP_404_NOT_FOUND)


    def delete(self, request, item):
        """Deleting favourite item"""
        favor = models.UserFavouriteItems.objects.filter(item=item) & models.UserFavouriteItems.objects.filter(user=request.user)
        myitem = models.Item.objects.get(id=item)
        itemserializer = serializers.ItemSerializer(myitem)
        favor.delete()
        return Response(itemserializer.data)