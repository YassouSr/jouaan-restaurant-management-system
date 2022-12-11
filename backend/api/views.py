from rest_framework import generics, permissions
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

class CustomerSignupView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = CustomerSignupSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            customer = serializer.save()
            if customer:
                return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomerLogoutView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = ()

    # put customer access token to the black list
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

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
