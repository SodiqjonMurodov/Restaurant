from rest_framework import serializers
from .models import Booking


class BookingFormSerializer(serializers.ModelSerializer):
    day = serializers.DateField(format='%d.%m.%Y', input_formats=['%d.%m.%Y'])
    time = serializers.TimeField(format='%H:%M', input_formats=['%H:%M'])

    class Meta:
        model = Booking
        fields = ['id', 'full_name', 'phone', 'day', 'time', 'email', 'guests']

    def validate_full_name(self, value):
        if len(value) == 0:
            raise serializers.ValidationError("The full name must not be an empty string.")
        if len(value) < 3 or len(value) > 100:
            raise serializers.ValidationError("The full name must be between 3 and 100 characters long.")
        return value

    def validate_guests(self, value):
        if value <= 0:
            raise serializers.ValidationError("Enter a number greater than 0")
        return value

