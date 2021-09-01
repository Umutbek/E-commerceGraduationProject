from django.urls import path, include
from user import views
from rest_framework.routers import DefaultRouter

app_name = 'user'

router = DefaultRouter()
router.register(r'user/store', views.StoreViewSet)
router.register(r'user/client', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path("user/login/", views.LoginAPI.as_view()),
]
