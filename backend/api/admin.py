from django.contrib import admin
from . import models

# Register your models here.

admin.site.register(models.User)
admin.site.register(models.RestaurantAdmin) 
admin.site.register(models.Customer)
admin.site.register(models.Chef)
admin.site.register(models.Driver)
admin.site.register(models.Payment)
admin.site.register(models.Plate)
admin.site.register(models.Feedback)
admin.site.register(models.Order)
admin.site.register(models.PlateCategory)
admin.site.register(models.Address)