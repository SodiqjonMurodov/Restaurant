from django.urls import path
from .views import BookingCreateAPIView, ConfirmReservationAPIView

urlpatterns = [
    path('booking-form', BookingCreateAPIView.as_view(), name='booking'),
    path('confirm/<str:token>', ConfirmReservationAPIView.as_view(), name='confirm'),
]

