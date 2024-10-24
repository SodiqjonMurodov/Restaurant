import asyncio
from django.utils import timezone
from rest_framework import generics
from .models import Booking
from .serializers import BookingFormSerializer
from .utils import send_confirmation_email
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .bot.telegram import send_to_telegram


class BookingCreateAPIView(generics.ListCreateAPIView):
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

        if reservation.is_confirmed == False:
            reservation.is_confirmed = True
            reservation.save()

            # Telegram message
            created_at_local = timezone.localtime(reservation.created_at)
            message = (
                f"Новое поступление бронирование #{reservation.id}.\n"
                f"Имя клиента: {reservation.full_name}\n"
                f"Дата и время прибытия: {reservation.day.strftime('%d.%m.%Y')} {reservation.time.strftime('%H:%M')}\n"
                f"Количество гостей: {reservation.guests}\n"
                f"Номер телефона: {reservation.phone}\n"
                f"Создано в дату: {created_at_local.strftime('%d.%m.%Y %H:%M')}\n"
            )
            asyncio.run(send_to_telegram(message))

        return Response({'message': 'Booking confirmed'}, status=status.HTTP_200_OK)


