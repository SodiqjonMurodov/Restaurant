from django.urls import path
from .views import BookingCreateApiView


urlpatterns = [
    path('booking-form', BookingCreateApiView.as_view()),

]

