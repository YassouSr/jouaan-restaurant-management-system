from django.db import models
from . import patterns
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import CustomUserManager

# Default authentication User model
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    last_name = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.first_name + " " + self.last_name
    
    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

class RestaurantAdmin(User):
    email_restaurant = models.EmailField(unique=True)
    address_restaurant = models.CharField(max_length=20)
    phone_number_restaurant = models.CharField(max_length=10)

class Payment(models.Model):
    name = models.CharField(unique=True, max_length=20)

    def __str__(self):
        return self.name 

class Customer(User):
    address = models.CharField(max_length=20, null=True)
    payment_methods = models.ManyToManyField(Payment)

class Chef(User):
    pass

class Courier(User):
    address = models.CharField(max_length=20, null=True)

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
        return '{}'.format(self.customer)
    