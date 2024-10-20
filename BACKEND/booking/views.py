from rest_framework import generics
from .models import Booking
from .serializers import BookingFormSerializer
from .utils import send_confirmation_email
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class BookingCreateAPIView(generics.CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingFormSerializer

    def perform_create(self, serializer):
        reservation = serializer.save()
        send_confirmation_email(reservation)


class ConfirmReservationAPIView(APIView):

    def get(self, request, token):
        try:
            reservation = Booking.objects.get(confirmation_token=token)
        except Booking.DoesNotExist:
            return Response({'message': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

        reservation.is_confirmed = True
        reservation.save()
        return Response({'message': 'Booking confirmed'}, status=status.HTTP_200_OK)
