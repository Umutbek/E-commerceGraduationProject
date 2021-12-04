from django.urls import path, include
from user import views
from rest_framework.routers import DefaultRouter

app_name = 'user'

router = DefaultRouter()
router.register(r'store', views.StoreViewSet)
router.register(r'client', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path("login/", views.LoginAPI.as_view()),
    path('getinfo/', views.GetMeView.as_view()),
    path('storecategory/', views.StoreCategoryView.as_view()),
]
