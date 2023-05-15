from rest_framework import serializers
from .models import *
from .messages import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from api.models import USER_ROLES
from django.utils.http import urlsafe_base64_decode
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_str
 
 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "first_name", "last_name", "email", "role")
        read_only_fields = ["id"]

class StaffSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("first_name", "last_name", "email", "password", "role")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()

        if instance.role == USER_ROLES[2][0]: # chef 
            Chef.objects.create(user_id=instance.id)

        elif instance.role == USER_ROLES[3][0]: # driver
            Driver.objects.create(user_id=instance.id)

        return instance

class AdminSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("first_name", "last_name", "email", "password", "role")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        RestaurantAdmin.objects.create(user_id=instance.id)
        
        return instance
    
class CustomerSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("first_name", "last_name", "email", "password", "role")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        Customer.objects.create(user_id=instance.id)
        
        return instance


class UserSigninSerializer(TokenObtainPairSerializer):
  def validate(self, attrs):
    data = super().validate(attrs)
    refresh = self.get_token(self.user)

    data['user'] = UserSerializer(self.user).data
    data['refresh'] = str(refresh)
    data['access'] = str(refresh.access_token)

    return data


class ResetPasswordRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)
    redirect_url = serializers.CharField(max_length=500, required=False)

    class Meta:
        fields = ['email']
    
    def validate(self, attrs):
        email = attrs.get('email')
        if User.objects.filter(email=email).exists():
            return super().validate(attrs)
        else:
            raise ValidationError("User with given email doesn't exist")


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            user_id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=user_id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)

            user.set_password(password)
            user.save()
            return super().validate(attrs)
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)
       











class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = (
            "id",
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "address_url"
        )
        read_only_fields = ["id"]


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
        extra_kwargs = {
            "name": {"required": False},
        }

class PlateCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PlateCategory
        fields = "__all__"

class PlateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plate
        fields = "__all__"

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"


class PlateQuantityInOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlateQuantityInOrder
        fields = ["quantity", "plate", "order"]


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ("description", "customer")
