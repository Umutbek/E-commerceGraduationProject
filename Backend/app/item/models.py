from django.db import models
from user.models import User, Store, RegularAccount
import requests


class Category(models.Model):
    """Subcategory for an Item"""
    nameEn = models.CharField(max_length=200)
    nameTr = models.CharField(max_length=200)
    icon = models.CharField(max_length=1000, null=True, blank=True)

    def __str__(self):
        return self.nameEn

class Subcategory(models.Model):
    """Subcategory for an Item"""
    nameEn = models.CharField(max_length=200)
    nameTr = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.nameEn


class SubSubcategory(models.Model):
    """Subcategory for an Item"""
    nameEn = models.CharField(max_length=200)
    nameTr = models.CharField(max_length=200)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.nameEn


class Item(models.Model):
    """Item model"""
    name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    cost = models.FloatField()
    category = models.ForeignKey(Category, related_name="category", on_delete=models.CASCADE)
    subcategory = models.ForeignKey(Subcategory, related_name="subcategory", on_delete=models.SET_NULL, null=True, blank=True)
    subsubcategory = models.ForeignKey(SubSubcategory, related_name="subsubcategory", on_delete=models.SET_NULL, null=True, blank=True)
    supplier = models.ForeignKey(User, on_delete=models.CASCADE)
    issale = models.BooleanField(default=False)
    discount = models.CharField(max_length=200, null=True, blank=True)
    publishDate = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class ItemWithQuantity(models.Model):
    """Item with quantity in cart"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="user")
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    total = models.IntegerField(default=0)

    def save(self):
        self.total=self.item.cost * self.quantity
        super(ItemWithQuantity, self).save()

    class Meta:
        ordering = ('-id',)


class ModelCart(models.Model):
    """Model for cart(busket)"""
    listitem = models.ManyToManyField('ItemWithQuantity')
    clientid = models.ForeignKey(RegularAccount, on_delete=models.CASCADE, null=True, blank=True, related_name="usercart")
    storeid = models.ForeignKey(Store, on_delete=models.CASCADE, null=True, related_name="storeidforcard")
    check = models.IntegerField(null=True)
    date = models.DateTimeField(auto_now_add=True, null=True)

    @property
    def total_price(self):
        queryset = self.listitem.all().aggregate(
            total_price=models.Sum('total'))
        return queryset['total_price']

    def count_cart(self):
        return self.listitem.count()







