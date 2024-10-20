from django.urls import path
from .views import ReservationCreateAPIView, ConfirmReservationAPIView

urlpatterns = [
    path('reserve', ReservationCreateAPIView.as_view(), name='reserve'),
    path('confirm/<str:token>', ConfirmReservationAPIView.as_view(), name='confirm'),
]

