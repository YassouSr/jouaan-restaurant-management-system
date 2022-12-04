from django.db import models
from . import patterns

class Payment(models.Model):
    name = models.CharField(unique=True, max_length=20)

    def __str__(self):
        return self.name
    
class User(models.Model):
    username = models.CharField(unique=True, max_length=10)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=10)
    phone_number = models.CharField(max_length=10)

    class Meta:
        abstract = True
    
    def __str__(self):
        return self.username

class Admin(User):
    email_restaurant = models.EmailField(unique=True)
    address_restaurant = models.CharField(max_length=20)
    phone_number_restaurant = models.CharField(max_length=10)

class Customer(User):
    address = models.CharField(max_length=20)
    payment_methods = models.ManyToManyField(Payment)

class Chef(User):
    pass

class Courier(User):
    address = models.CharField(max_length=20)

class Menu(patterns.SingletonModel):
    version = models.IntegerField()

class Ingredient(models.Model):
    name = models.CharField(unique=True, max_length=10)

    def __str__(self):
        return self.name

class PlateCategory(models.Model):
    name = models.CharField(unique=True, max_length=10)

    def __str__(self):
        return self.name

class Plate(models.Model):
    name = models.CharField(unique=True, max_length=10)
    price = models.IntegerField()
    chef = models.ForeignKey(Chef, null=True, on_delete=models.SET_NULL) 
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE) 
    ingredients = models.ManyToManyField(Ingredient)
    category = models.ForeignKey(PlateCategory, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Order(models.Model):
    date_time = models.DateTimeField()
    total_price = models.IntegerField()
    payment_method = models.ForeignKey(Payment, on_delete=models.PROTECT)
    courier = models.ForeignKey(Courier, null=True, on_delete=models.SET_NULL)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    plates = models.ManyToManyField(Plate)

    def __str__(self):
        return "{0} / {1}".format(self.customer, self.courier)

class Feedback(models.Model):
    description = models.TextField()
    date_time = models.DateTimeField()
    rating = models.IntegerField()
    customer = models.OneToOneField(Customer, null=True, on_delete=models.SET_NULL) 

    def __str__(self):
        return self.customer
    