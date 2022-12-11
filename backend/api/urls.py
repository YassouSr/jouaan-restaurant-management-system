from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
 
urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('customer/signup/', CustomerSignupView.as_view(), name='customer-signup'),
    path('customer/logout/', CustomerLogoutView.as_view(), name='customer-logout'),

    path('chefs/', ListChefs.as_view()),
    path('couriers/', ListCouriers.as_view()),
    path('payments/', ListPayments.as_view()),
    path('categories/', ListCategoryPlates.as_view()),
    path('plates/', ListPlates.as_view()),
    path('orders/', ListOrders.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)