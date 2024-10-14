from rest_framework import serializers
from .models import Booking, Table, Payment


class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ['id', 'name', 'capacity', 'image', 'count', 'status', 'price']


class BookingFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['full_name', 'phone', 'day', 'time', 'table']


class PaymentFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['card_name', 'card_serial', 'booking']

