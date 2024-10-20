from django.urls import path
from .views import MenuHomeListApiView, MenuListApiView, MenuPDFView

urlpatterns = [
    path('home/menu', MenuHomeListApiView.as_view(), name='home-menu'),
    path('menu', MenuListApiView.as_view(), name='menu'),
    path('menu/<int:pk>/get-pdf', MenuPDFView.as_view(), name='menu-pdf'),
]