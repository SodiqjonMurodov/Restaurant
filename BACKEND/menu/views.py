from rest_framework import generics
from .models import Menu, Food
from .serializers import MenuSerializer


class MenuHomeListApiView(generics.ListAPIView):
    queryset = Menu.objects.all()[:3]
    serializer_class = MenuSerializer


class MenuListApiView(generics.ListAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
