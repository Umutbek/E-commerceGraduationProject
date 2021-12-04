import uuid
import os
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, \
                                       BaseUserManager, PermissionsMixin
from django.db.models import Q

from django.conf import settings
from django.utils.translation import ugettext_lazy as _
from django_fsm import FSMIntegerField, transition
from user import utils
from app.utils import unique_store_slug_generator, unique_slug_generator
from django.db.models.signals import pre_save


class StoreCategory(models.Model):
    """Model for store categories"""
    nameEn = models.CharField(max_length=200)
    nameTr = models.CharField(max_length=200)
    icon = models.TextField(null=True, blank=True)
    slug = models.SlugField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.nameEn

    class Meta:
        ordering = ('id',)


class UserManager(BaseUserManager):
    """Manager for user profiles"""
    def create_user(self, login, password=None, **extra_fields):
        """Creates and saves a new user"""
        if not login:
            raise ValueError('User must have an Email or phone')
        user = self.model(login=login, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, login, password):
        """create a superuser"""
        user = self.create_user(login, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """Model for User"""
    username = models.CharField(max_length=200, null=True, blank=True)
    login = models.CharField(max_length=200, unique=True)
    email = models.CharField(max_length=200, blank=True, null=True)
    phone = models.CharField(max_length=200, blank=True, null=True)
    slug = models.SlugField(max_length=200, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    type = FSMIntegerField(choices=utils.UserTypes.choices, default=utils.UserTypes.USER)
    avatar = models.TextField(null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'login'

    class Meta:
        ordering = ('-id',)
        verbose_name = _("User")
        verbose_name_plural = _("Users")


class Store(User):
    """Model for Store"""
    slogan = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    storecategory = models.ManyToManyField('StoreCategory')

    class Meta:
        verbose_name = _("Store")
        verbose_name_plural = _("Stores")


class RegularAccount(User):
    """Model for Regular account"""
    datebirth = models.DateField(null=True, blank=True, verbose_name="Date of birthday")
    gender = FSMIntegerField(choices=utils.UserGender.choices, default=utils.UserGender.NotIndicated, verbose_name="Gender")
    clientaddress = models.CharField(max_length=500, null=True, blank=True)

    class Meta:
        verbose_name = _("Regular user")
        verbose_name_plural = _("Regular users")


def slug_generator(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = unique_slug_generator(instance)

def slug_store_generator(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = unique_store_slug_generator(instance)

pre_save.connect(slug_store_generator, sender=User)
pre_save.connect(slug_generator, sender=StoreCategory)
