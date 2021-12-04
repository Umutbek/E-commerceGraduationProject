from django.db import models

class UserTypes(models.IntegerChoices):
    USER = 1, 'Regular user'
    STORE = 2, 'Store'


class UserGender(models.IntegerChoices):
    Male = 1, 'Male'
    Female =2, 'Female'
    Other = 3, 'Other'
    NotIndicated = 4, 'Not indicated'
