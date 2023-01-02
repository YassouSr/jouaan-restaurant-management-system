from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

urlpatterns = [
    # authentication
    path("customer/signup/", CustomerSignupView.as_view(), name="customer_signup"),
    path("customer/signin/", CustomerSigninView.as_view(), name="user_signin"),
    path("user/logout/", UserLogoutView.as_view(), name="user_logout"),
    path("token/refresh/", TokenRefreshView.as_view(), name="user_token_refresh"),
    path(
        "customer/<int:pk>/", CustomerView.as_view(), name="user_update_delete_profile"
    ), 
    # customer endpoints
    path("payments/", ListPaymentsView.as_view(), name="list_all_payments"),
    path("categories/", ListCategoryPlatesView.as_view(), name="list_plate_categories"),
    path("plates/<int:category_id>/", ListPlatesView.as_view(), name="list_plates"),
    path(
        "orders/<int:customer_id>/",
        CustomerOrderView.as_view(),
        name="list_customer_orders",
    ),
    path("feedback/", CustomerFeedbackView.as_view(), name="create_feedback"),
    path(
        "feedback/<int:customer_id>/",
        CustomerFeedbackView.as_view(),
        name="retrieve_update_delete_feedback",
    ),
    path("support/", CustomerSupportView.as_view(), name="support_view"),

    path("create-order/", CustomerOrderView.as_view(), name="create-order")
]

urlpatterns = format_suffix_patterns(urlpatterns)