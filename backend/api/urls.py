from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
    path('customers/', ListCustomers.as_view()),
    path('chefs/', ListChefs.as_view()),
    path('couriers/', ListCouriers.as_view()),
    path('payments/', ListPayments.as_view()),
    path('categories/', ListCategoryPlates.as_view()),
    path('plates/', ListPlates.as_view()),
    path('orders/', ListOrders.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)