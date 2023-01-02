from rest_framework import generics, permissions, status, exceptions
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .messages import *
from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import send_mail
from django.conf import settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# exceptions
class RequiredRequestDataField(Exception):
    def __init__(self, field):
        self.field = field
        self.message = field + " is required in request body."
        super().__init__(self.message)

class NoneRequestDataField(Exception):
    def __init__(self, field):
        self.field = field
        self.message = field + " must not be none."
        super().__init__(self.message)


# Authentication
class CustomerSignupView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = CustomerSignupSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(messages["customer_signup"], status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Override 'token/' endpoint
class CustomerSigninView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = TokenObtainPairSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user_email = request.data["email"]
            customer = Customer.objects.get(email=user_email)
            address_map = Address.objects.filter(customer_id=customer.id)

            if len(address_map.values()) == 0:
                serializer.validated_data["user"] = {
                    "id": customer.id,
                    "last_name": customer.last_name,
                    "first_name": customer.first_name,
                    "email": customer.email,
                    "phone_number": customer.phone_number,
                    "address_url": customer.address_url if customer.address_url else None,
                }
            else:
                address_serializer = AddressSerializer(instance=address_map[0]).data
                serializer.validated_data["user"] = {
                    "id": customer.id,
                    "last_name": customer.last_name,
                    "first_name": customer.first_name,
                    "email": customer.email,
                    "phone_number": customer.phone_number,
                    "address_url": customer.address_url if customer.address_url else None,
                    "address_map": {
                        "longitude": address_serializer["longitude"],
                        'latitude': address_serializer["latitude"]
                    }
                }

            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    # put user refresh token to the black list
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(
                messages["user_logout"], status=status.HTTP_205_RESET_CONTENT
            )
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CustomerView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    # update
    def put(self, request, pk):
        if ('address_map' not in request.data) and ('address_url' not in request.data):
            raise RequiredRequestDataField("address_map or address_url")
        if ('address_map' not in request.data) and (request.data['address_url'] is None):
            raise NoneRequestDataField('address_url')

        if ('address_map' in request.data):
            address_data = request.data.pop('address_map')
            address_instance = Address.objects.filter(customer_id=pk)
            address_status = True
            if ('customer' not in address_data):
                raise RequiredRequestDataField("customer")
        else:
            address_status = False

        customer = Customer.objects.get(id=pk)
        customer_serializer = CustomerSerializer(customer, data=request.data)

        if customer_serializer.is_valid(raise_exception=True):
            # update customer information
            customer_serializer.update(instance=customer, validated_data=customer_serializer.validated_data)
            response = customer_serializer.validated_data

            # create or update customer address map
            if address_status:
                # customer doesn't have address map yet
                if len(address_instance.values()) == 0:
                    address_serializer = AddressSerializer(data=address_data)
                    if address_serializer.is_valid(raise_exception=True):
                        address_serializer.save()
                        response["address_map"] = {
                            "longitude": address_serializer.validated_data["longitude"],
                            "latitude": address_serializer.validated_data["latitude"]
                        }
                    else:
                        return Response(address_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                # update customer address map
                else:
                    address_serializer = AddressSerializer(address_instance[0], data=address_data)
                    if address_serializer.is_valid(raise_exception=True):
                        address_data['customer_id'] = address_data['customer']
                        address_data.pop('customer')
                        address_serializer.update(instance=address_instance[0], validated_data=address_data)
                        response["address_map"] = {
                            "longitude": address_serializer.validated_data["longitude"],
                            "latitude": address_serializer.validated_data["latitude"]
                        }
                    else:
                        return Response(address_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                    
            return Response(response, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(customer_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # delete
    def delete(self, request, pk):
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ListPaymentsView(generics.ListAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.AllowAny]

class ListCategoryPlatesView(generics.ListAPIView):
    queryset = PlateCategory.objects.all()
    serializer_class = PlateCategorySerializer
    permission_classes = [permissions.AllowAny]


class ListPlatesView(generics.ListAPIView):
    serializer_class = PlateSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        category_id = self.kwargs["category_id"]
        plates = Plate.objects.filter(category_id=category_id)
        return plates


class CustomerOrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    # create order
    def post(self, request, *args, **kwargs):
        try:
            if not "quantity" in request.data:
                raise RequiredRequestDataField("quantity")

            order_data = {
                "total_price": request.data["total_price"],
                "payment_method": request.data["payment_method"],
                "customer": request.data["customer"],
                "plates": request.data["plates"],
                "status": "progress",
            }
            order_serializer = OrderSerializer(data=order_data)
            if order_serializer.is_valid(raise_exception=True):
                order_instance = order_serializer.save()

            quantity_data = []
            for item in request.data["quantity"]:
                quantity_data.append(
                    {
                        "order": order_instance.id,
                        "plate": item["plate_id"],
                        "quantity": item["plate_quantity"],
                    }
                )

            quantity_serializer = PlateQuantityInOrderSerializer(
                data=quantity_data, many=True
            )
            if quantity_serializer.is_valid(raise_exception=True):
                quantity_serializer.save()

            return Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    # list orders
    def get(self, request, customer_id):
        try:
            data = []
            orders = Order.objects.filter(customer_id=customer_id)
            for order in orders:
                plates_quantity = PlateQuantityInOrder.objects.filter(
                    order_id=order.id
                ).values()
                if len(plates_quantity) == 0:
                    raise Exception

                plates_objects = []
                order_object = {}

                order_object["timestamp"] = order.timestamp.strftime(
                    "%m/%d/%Y, %H:%M:%S"
                )
                order_object["price"] = order.total_price
                order_object["payment"] = order.payment_method.name
                order_object["status"] = order.status
                for plate in order.plates.all():
                    plate_quantity = [
                        item for item in plates_quantity if item["plate_id"] == plate.id
                    ]
                    plates_objects.append(
                        {
                            "plate_name": plate.name,
                            "plate_quantity": plate_quantity[0]["quantity"],
                        }
                    )

                order_object["plates"] = plates_objects
                data.append(order_object)
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CustomerFeedbackView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    # retrieve feedback
    def get(self, request, customer_id):
        try:
            customer = Customer.objects.get(id=customer_id)
            feedback = Feedback.objects.get(customer=customer)
            return Response(
                {"description": feedback.description}, status=status.HTTP_200_OK
            )
        except ObjectDoesNotExist:
            return Response(
                messages["feedback_does_not_exist"], status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    # create feedback
    def post(self, request):
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # update feedback
    def put(self, request, customer_id):
        feedback = Feedback.objects.get(customer=customer_id)
        serializer = FeedbackSerializer(feedback, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # delete object
    def delete(self, request, customer_id):
        try:
            feedback = Feedback.objects.get(customer=customer_id)
            feedback.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CustomerSupportView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            mail_subject = "Support for user with email {}".format(
                request.data["email"]
            )
            print("sending email ...")
            send_mail(
                subject=mail_subject,
                message=request.data["description"],
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[settings.RECIPIENT_ADDRESS],
            )
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)
