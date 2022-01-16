from item import models, firestore

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


def create_order_in_firebase(saved_data, currentuser):

    data = {
        u'id': saved_data.id, u'clientId': saved_data.clientId.id, u'storeId': saved_data.storeId.id,
        u'phone': saved_data.clientId.phone, u'status': saved_data.status, u'totalprice': saved_data.totalprice,
        u'totalcount': saved_data.totalcount, u'ordertype': saved_data.ordertype, u'declinereason': saved_data.declinereason,
        u'address': saved_data.address, u'comment': saved_data.comment, u'date': saved_data.date
    }
    firestore.db.collection(u'stores')\
        .document(str(saved_data.storeId.id))\
        .collection(u'orders').document(
        str(saved_data.id)).set(data)

    for i in saved_data.cart.listitem.all():

        item = {
            u'id': i.item.id, u'name': i.item.name, u'cost': i.item.cost, u'total': i.total,
            u'quantity': i.quantity
        }
        firestore.db.collection(u'stores').document(str(saved_data.storeId.id)).collection(u'orders').document(
            str(saved_data.id)).collection(u'items').document(
            str(i.item.id)).set(item)

    saved_data.cart.isavailable = False
    for i in saved_data.cart.listitem.all():
        print(i)
        i.isavailable = False
        print("After", i.isavailable)
        i.save()

    saved_data.cart.save()


def filtered_params(category, subcategory, subsubcategory):
    diction = {}
    mylist = {}

    if category:
        category = models.Category.objects.filter(slug=category).first()

        if category:
            diction = {
                "nameEn": category.nameEn,
                "nameTr": category.nameTr,

            }
            mylist['category'] = diction

    if subcategory:
        subcategory = models.SubCategory.objects.filter(slug=subcategory).first()

        if subcategory:

            diction = {
                "nameEn": subcategory.nameEn,
                "nameTr": subcategory.nameTr,
                "category": subcategory.category.slug
            }
            mylist['subcategory'] = diction

    if subsubcategory:
        subsubcategory = models.SubSubCategory.objects.filter(slug=subsubcategory).first()

        if subsubcategory:

            diction = {
                "nameEn": subsubcategory.nameEn,
                "nameTr": subsubcategory.nameTr,
                "subcategory": subsubcategory.subcategory.slug
            }
            mylist['subsubcategory'] = diction

    return mylist