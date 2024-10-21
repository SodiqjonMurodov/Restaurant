from django.urls import path
from .views import MenuHomeListApiView, MenuListApiView

urlpatterns = [
    path('home/menu', MenuHomeListApiView.as_view(), name='home-menu'),
    path('menu', MenuListApiView.as_view(), name='menu'),
]