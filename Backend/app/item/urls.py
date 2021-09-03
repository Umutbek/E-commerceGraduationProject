from django.urls import path, include
from item import views
from rest_framework.routers import DefaultRouter

app_name = 'item'

router = DefaultRouter()
router.register(r'category', views.CategoryViewSet)
router.register(r'subcategory', views.SubcategoryViewSet)
router.register(r'subsubcategory', views.SubSubcategoryViewSet)
router.register(r'item', views.ItemViewSet)

urlpatterns = [
    path('', include(router.urls))
]