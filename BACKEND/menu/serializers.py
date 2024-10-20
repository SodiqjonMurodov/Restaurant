from rest_framework import serializers
from .models import Food, Category, Menu


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['id', 'name', 'price']


class CategorySerializer(serializers.ModelSerializer):
    foods = FoodSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'foods']


class MenuSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Menu
        fields = ['id', 'title', 'image']
