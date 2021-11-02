from django.db import models

class OrderStatuses(models.IntegerChoices):
    New = 1, 'New'
    Packing = 2, 'Packing'
    Delivering = 3, 'On way'
    Delivered = 4, 'Delivered'
    Rejected = 5, 'Declined'
    ClientReject = 6, 'Declined by client'

class OrderType(models.IntegerChoices):
    delivery = 1, 'C доставкой'
    pickup = 2, 'Самовывоз'


class PaymentType(models.IntegerChoices):
    cash = 1, 'Наличными'
    cart = 2, 'С картой'
