from django.contrib.auth import get_user_model, authenticate, password_validation
from rest_framework import serializers, exceptions
from django.conf import settings
from user import models, utils
from django.utils.translation import ugettext_lazy as _

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username','login', 'phone', 'date', 'email', 'avatar', 'address', 'type')
        read_only_fields = ('id',)

    def create(self, validated_data):
        """Create user with encrypted password and return it"""
        return self.Meta.model.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        """Update a user, setting the password correctly and return ittt"""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()
        return user


class RegularAccountSerializer(UserSerializer):

    class Meta:
        model = models.RegularAccount
        fields = ('id', 'username', 'login', 'phone', 'email', 'avatar', 'date', 'address',
                  'type', 'datebirth', 'gender', 'password'
                  )
        extra_kwargs = {'password':{'write_only':True},}


class StoreSerializer(UserSerializer):

    class Meta:
        model = models.Store
        fields = ('id', 'username','login', 'phone', 'email', 'avatar', 'type', 'address', 'password',
                  'slogan', 'description')

        read_only_field = ('id',)
        extra_kwargs = {'password':{'write_only':True},}



class LoginSerializer(serializers.Serializer):
    """Serializer for login"""
    login = serializers.CharField()
    password = serializers.CharField(
        style = {'input_type':'password'}, trim_whitespace=False
    )

    class Meta:
        model: User
        fields = ('login', 'password')


    def validate(self, data):
        login = data.get('login')
        password = data.get('password')

        if login is None:
            raise serializers.ValidationError(
                'A phone or email is required to log in.'
            )
        if password is None:
            raise serializers.ValidationError(
                'A password is required to log in.'
            )

        user = authenticate(
            request = self.context.get('request'),
            login=login,
            password=password,
        )

        if not user:
            msg = _('Incorrect login or password!!!')
            raise serializers.ValidationError({'detail': msg}, code='authorization')

        data['user']= user

        return data


class PasswordChangeSerializer(serializers.Serializer):
    """Password change serializer"""
    model = models.Store
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)