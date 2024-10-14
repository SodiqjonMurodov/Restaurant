from django.db.models import Avg
from rest_framework import serializers
from .models import Menu, Ingredients, Category, Cooks, Gallery, Company, MediaLinks, Feedback, Testimonial, Service, \
    Post, Rating


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category_name']


class IngredientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredients
        fields = ['id', 'name', 'value']


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['rating']


class MenuListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    ingredients = IngredientsSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Menu
        fields = ['id', 'title', 'subtitle', 'category', 'image', 'price', 'ingredients', 'average_rating']

    def get_average_rating(self, obj):
        return obj.ratings.aggregate(Avg('rating'))['rating__avg'] or 0


class MenuHomeSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Menu
        fields = ['id', 'title', 'subtitle', 'category', 'image', 'price']


class CooksListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cooks
        fields = ['id', 'full_name', 'description', 'image', 'age', 'skill']


class CooksHomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cooks
        fields = ['id', 'full_name', 'image', 'skill']


class PostsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'subtitle', 'body', 'image']


class PostsHomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'subtitle', 'image']


class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = ['id', 'image']


class MediaLinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaLinks
        fields = ['id', 'messanger', 'link']


class CompanySerializer(serializers.ModelSerializer):
    media_links = MediaLinksSerializer(many=True, read_only=True)

    class Meta:
        model = Company
        fields = ['id', 'name', 'phone', 'email', 'address', 'coordinate', 'media_links']


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['full_name', 'email', 'phone', 'body']


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'name', 'description', 'image']


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'title', 'subtitle1', 'subtitle2', 'description1', 'description2', 'description3', 'image']