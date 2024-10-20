from rest_framework import generics
from .models import Cooks, Gallery, Company, Service, Testimonial, Post
from .serializers import CooksHomeSerializer, GallerySerializer, CompanySerializer, TestimonialSerializer, \
    ServiceSerializer, PostsListSerializer, PostsHomeSerializer


class PostsListApiView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostsListSerializer


class PostDetailApiView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostsListSerializer


class GalleryListApiView(generics.ListAPIView):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer


class CompanyListApiView(generics.ListAPIView):
    queryset = Company.objects.all()[:1]
    serializer_class = CompanySerializer


class PostsHomeListApiView(generics.ListAPIView):
    queryset = Post.objects.all()[:4]
    serializer_class = PostsHomeSerializer


class CooksHomeListApiView(generics.ListAPIView):
    queryset = Cooks.objects.all()[:3]
    serializer_class = CooksHomeSerializer


class GalleryHomeListApiView(generics.ListAPIView):
    queryset = Gallery.objects.all()[:6]
    serializer_class = GallerySerializer


class TestimonialsHomeListApiView(generics.ListAPIView):
    queryset = Testimonial.objects.all()[:4]
    serializer_class = TestimonialSerializer


class ServicesHomeListApiView(generics.ListAPIView):
    queryset = Service.objects.all()[:2]
    serializer_class = ServiceSerializer
