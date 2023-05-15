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
from api.errors import RequiredRequestDataField, NoneRequestDataField
from api.customer_permissions import *
from django.utils.http import urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.core.mail import send_mail
from django.utils.encoding import smart_str, smart_bytes, DjangoUnicodeDecodeError
 

# Authentication
class CustomerSignupView(APIView):
    # signup for customer
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = CustomerSignupSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminSignupView(APIView):
    # signup for admin
    permission_classes = [permissions.IsAdminUser] # only superuser
    
    def post(self, request):
        serializer = AdminSignupSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StaffSignupView(APIView):
    # signup for chef and driver
    permission_classes = [permissions.IsAuthenticated & IsRAdminUser] # admin
    
    def post(self, request):
        serializer = StaffSignupSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class UserSigninView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = UserSigninSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogoutView(APIView):
    # logout for all users
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class RequestPasswordResetEmailView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = ResetPasswordRequestSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data.get('email')
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(request=request).domain
            relativeLink = reverse(
                'password_reset_confirm', kwargs={'uidb64': uidb64, 'token': token}
            )

            redirect_url = request.data.get('redirect_url', '')
            absurl = 'http://'+current_site + relativeLink
            email_body = 'Hello, \n Use link below to reset your password  \n' + \
                absurl+"?redirect_url="+redirect_url
            
            # send email
            send_mail(
                subject='Reset your passsword', 
                message=email_body, 
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[user.email]
            )

            return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetTokenCheckView(APIView):
    def get(self, request, uidb64, token):
        try:
            user_id = smart_str(urlsafe_base64_decode(uidb64))
            user= User.objects.get(id=user_id)
            if not PasswordResetTokenGenerator().check_token(user,token):
                return Response({'error':'token is not valid, please check the new one'},status=status.HTTP_401_UNAUTHORIZED)
            return Response({'sucess':True, 'message':'Credential Valid','uidb64':uidb64, 'token':token},status=status.HTTP_200_OK)

        except DjangoUnicodeDecodeError:
            return Response({'error':'token is not valid, please check the new one'},status=status.HTTP_401_UNAUTHORIZED)


class SetNewPasswordAPIView(APIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response({'success': True, 'message': 'Password reset success'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


############"""" Authentication using http only cookie

from django.contrib.auth import authenticate
class LoginHTTPOnlyCookieView(APIView):
    def post(self, request, format=None):
        serializer = UserSigninSerializer(data=request.data)
        response = Response()  

        if serializer.is_valid(raise_exception=True):
            response.set_cookie(
                key = settings.SIMPLE_JWT['AUTH_COOKIE'], 
                value = serializer.validated_data.get('access'),
                expires = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            ) 
            response.data = {"Success" : "Login successfully","data":serializer.validated_data}
            return response
        else:
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)




















#####################""""""

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
            send_mail(
                subject=mail_subject,
                message=request.data["description"],
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[settings.RECIPIENT_ADDRESS],
            )
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
