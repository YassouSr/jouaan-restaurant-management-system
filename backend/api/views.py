from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *

# List views to get all objects

class ListCustomers(generics.ListAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class ListChefs(generics.ListAPIView):
    queryset = Chef.objects.all()
    serializer_class = ChefSerializer

class ListCouriers(generics.ListAPIView):
    queryset = Courier.objects.all()
    serializer_class = CourierSerializer

class ListPayments(generics.ListAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class ListCategoryPlates(generics.ListAPIView):
    queryset = PlateCategory.objects.all()
    serializer_class = PlateCategorySerializer

class ListPlates(generics.ListAPIView):
    queryset = Plate.objects.all()
    serializer_class = PlateSerializer

class ListOrders(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
