from django.urls import path
from .views import TableListApiView, BookingCreateApiView, PaymentCreateApiView


urlpatterns = [
    path('tables', TableListApiView.as_view()),
    path('booking-form', BookingCreateApiView.as_view()),
    path('payment-form', PaymentCreateApiView.as_view()),

]

