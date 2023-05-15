from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

urlpatterns = [
    # authentication
    # path("customer/signup/", CustomerSignupView.as_view(), name="customer_signup"),
    # path("customer/signin/", CustomerSigninView.as_view(), name="user_signin"),
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
    path("create-order/", CustomerOrderView.as_view(), name="create-order"),





    # Authentication
    path("auth/customer/signup/", CustomerSignupView().as_view(), name="customer_signup"),
    path("auth/admin/signup/", AdminSignupView().as_view(), name="admin_signup"),
    path("auth/staff/signup/", StaffSignupView().as_view(), name="staff_signup"),
    path("auth/user/signin/", UserSigninView.as_view(), name="user_signin"),
    path("auth/user/logout/", UserLogoutView.as_view(), name="user_logout"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="user_token_refresh"),
    path('auth/request-reset-password/', RequestPasswordResetEmailView.as_view(), name="request_reset_password"),
    path('auth/password-reset/<uidb64>/<token>/', PasswordResetTokenCheckView.as_view(), name='password_reset_confirm'),
    path('auth/password-reset-complete/', SetNewPasswordAPIView.as_view(), name='password_reset_complete'),




    # authentication with httponly cookie
    path('auth/httponly/login/', LoginHTTPOnlyCookieView.as_view(), name='http_only_login'),
]

urlpatterns = format_suffix_patterns(urlpatterns)