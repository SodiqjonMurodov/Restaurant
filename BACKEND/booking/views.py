from rest_framework import generics
from .serializers import BookingFormSerializer
from .models import Booking


class BookingCreateApiView(generics.CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingFormSerializer

