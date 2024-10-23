from rest_framework import serializers
from .models import Cooks, Gallery, Company, MediaLinks, Testimonial, Service, Post


class CooksHomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cooks
        fields = ['id', 'full_name', 'image', 'skill']


class PostsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'subtitle', 'description', 'image']


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
        fields = ['id', 'name', 'phone1', 'phone2', 'address', 'coordinate', 'about_us', 'media_links', 'latitude', 'longitude']


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'full_name', 'description', 'image']


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'title', 'subtitle1', 'subtitle2', 'description1', 'description2', 'description3', 'image']
