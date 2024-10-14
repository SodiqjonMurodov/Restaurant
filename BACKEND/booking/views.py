from rest_framework import generics
from .serializers import TableSerializer, BookingFormSerializer, PaymentFormSerializer
from .models import Table, Booking, Payment


class TableListApiView(generics.ListAPIView):
    queryset = Table.objects.all()
    serializer_class = TableSerializer


class BookingCreateApiView(generics.CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingFormSerializer


class PaymentCreateApiView(generics.CreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentFormSerializer

