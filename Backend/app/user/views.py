from rest_framework import status
from rest_framework import viewsets

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, status, generics, authentication
from rest_framework.decorators import api_view, permission_classes, action

from user import models, serializers
from django.shortcuts import get_object_or_404

from django.db.models import Sum, Count, F, Q
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class StoreViewSet(viewsets.ModelViewSet):
    """Manage Store"""
    queryset = models.Store.objects.all()
    serializer_class = serializers.StoreSerializer

    # filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    # filter_class = filter.StoreFilter
    # search_fields = ('username', 'description', 'slogan')


class UserViewSet(viewsets.ModelViewSet):
    """Manage Regular account"""
    permission_classes = (permissions.AllowAny,)
    queryset = models.RegularAccount.objects.all()
    serializer_class = serializers.RegularAccountSerializer


class LoginAPI(APIView):
    """Create a new auth token for user"""
    serializer_class = serializers.LoginSerializer

    def post(self, request):
        serializer = serializers.LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        info = models.User.objects.filter(login=user)
        userdata = serializers.UserSerializer(info, many=True)
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, 'data': userdata.data}, status=200)


class GetMeView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user"""
    serializer_class = serializers.UserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """Retrieve and return authentication user"""
        return self.request.user