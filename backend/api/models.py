from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import CustomUserManager
from django.core.validators import MaxValueValidator, MinValueValidator, validate_slug

ORDER_STATUS = [
        ['progress', 'Progress'], # order is under preparation by the chef
        ['being_delivered', 'Being delivered'],
        ['completed', 'Completed'], # order has been delivered successfully
    ]
    
# Default authentication User model
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=100, unique=True)
    last_name = models.CharField(max_length=50, validators=[validate_slug])
    first_name = models.CharField(max_length=50, validators=[validate_slug])
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
    address_restaurant = models.CharField(max_length=100)
    phone_number_restaurant = models.CharField(max_length=20)

class Customer(User):
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    address_url = models.URLField(max_length=100, blank=True, null=True)

class Address(models.Model):
    longitude = models.FloatField()
    latitude = models.FloatField()
    customer = models.OneToOneField(Customer, blank=True, null=True, on_delete=models.CASCADE)

class Chef(User):
    phone_number = models.CharField(max_length=20, blank=True, null=True)

class Driver(User):
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    address = models.CharField(max_length=100, null=True, blank=True)

class PlateCategory(models.Model):
    name = models.CharField(unique=True, max_length=50)

    def __str__(self):
        return self.name

class Plate(models.Model):
    name = models.CharField(unique=True, max_length=50)
    price = models.IntegerField()
    chef = models.ForeignKey(Chef, null=True, on_delete=models.SET_NULL) 
    category = models.ForeignKey(PlateCategory, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Payment(models.Model):
    name = models.CharField(unique=True, max_length=50)

    def __str__(self):
        return self.name

class Order(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    total_price = models.IntegerField()
    payment_method = models.ForeignKey(Payment, on_delete=models.PROTECT)
    driver = models.ForeignKey(Driver, null=True, on_delete=models.SET_NULL)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    plates = models.ManyToManyField(Plate)
    status = models.CharField(max_length=20, choices=ORDER_STATUS)

    def __str__(self):
        return "{0} / {1}".format(self.customer, self.driver)

class PlateQuantityInOrder(models.Model):
    plate = models.ForeignKey(Plate, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    quantity = models.IntegerField(validators=[MinValueValidator(0)])

class Feedback(models.Model):
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    customer = models.OneToOneField(Customer, null=True, on_delete=models.CASCADE) 

    def __str__(self):
        return '{}'.format(self.customer)
