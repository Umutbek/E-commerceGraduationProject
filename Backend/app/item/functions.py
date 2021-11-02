from item import models

def create_cart(self,serializer):

    itemid = serializer.validated_data['itemid']
    client = serializer.validated_data['client']
    store = serializer.validated_data['store']
    itemwithquant = models.ItemWithQuantity.objects.filter(item=itemid, user=self.request.user)
    item = models.Item.objects.get(id=itemid)
    mystore = models.Store.objects.get(id=store)
    myuser = models.RegularAccount.objects.get(id=client)


    if itemwithquant:
        for i in itemwithquant:
            i.user = self.request.user
            i.quantity = i.quantity + 1
            i.save()
    else:
        newitemwithquant = models.ItemWithQuantity(user=self.request.user, item=item)
        newitemwithquant.save()

    newitemwithquant = models.ItemWithQuantity.objects.filter(item=item, user=self.request.user)
    cart = models.ModelCart.objects.filter(check=store + client)

    if cart:
        for j in cart:
            for i in j.listitem.all():
                for q in newitemwithquant:
                    j.listitem.add(q)
                    j.save()
    else:
        newcart = models.ModelCart(
            clientid=myuser, storeid=mystore, check=store + client
        )
        newcart.save()
        addcart = models.ModelCart.objects.filter(check=store + client)
        for i in addcart:
            for q in newitemwithquant:
                i.listitem.add(q)
                i.save()