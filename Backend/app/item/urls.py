from django.urls import path, include
from item import views
from rest_framework.routers import DefaultRouter

app_name = 'item'

router = DefaultRouter()
router.register(r'category', views.CategoryViewSet)
router.register(r'subcategory', views.SubcategoryViewSet)
router.register(r'subsubcategory', views.SubSubcategoryViewSet)
router.register(r'item', views.ItemViewSet)
router.register(r'cart', views.CartViewSet)
router.register(r'clientorder', views.ClientOrderViewSet)

urlpatterns = [
    path('', include(router.urls))
]