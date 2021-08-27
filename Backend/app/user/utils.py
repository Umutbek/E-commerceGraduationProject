from django.db import models

class UserTypes(models.IntegerChoices):
    USER = 1, 'Пользователь'
    STORE = 2, 'МАГАЗИН'


class UserGender(models.IntegerChoices):
    Male = 1, 'Мужской'
    Female =2, 'Женский'
    Other = 3, 'Другое'
    NotIndicated = 4, 'Не указано'
