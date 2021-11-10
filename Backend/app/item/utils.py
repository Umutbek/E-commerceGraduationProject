from django.db import models

class OrderStatuses(models.IntegerChoices):
    New = 1, 'New'
    Packing = 2, 'Packing'
    Delivering = 3, 'On way'
    Delivered = 4, 'Delivered'
    Rejected = 5, 'Declined'
    ClientReject = 6, 'Declined by client'

class OrderType(models.IntegerChoices):
    delivery = 1, 'Delivery'
    pickup = 2, 'Pick up'


class PaymentType(models.IntegerChoices):
    cash = 1, 'Cash'
    cart = 2, 'Online payment'
