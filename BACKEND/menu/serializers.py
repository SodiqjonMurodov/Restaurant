from rest_framework import serializers
from .models import Food, Category, Menu


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class MenuSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Menu
        fields = ['id', 'title', 'image', 'category']
        depth = 2
