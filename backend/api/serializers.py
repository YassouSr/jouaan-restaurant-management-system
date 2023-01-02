from rest_framework import serializers
from .models import *
from .messages import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# Authentication
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "first_name", "last_name", "email")
        read_only_fields = ["id"]

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


class CustomerSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ("first_name", "last_name", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    # create customer with hashed password
    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

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
