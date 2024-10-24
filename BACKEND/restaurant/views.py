from rest_framework import generics
from rest_framework.views import APIView
from django.http import FileResponse
from rest_framework.exceptions import NotFound
from rest_framework.pagination import PageNumberPagination
from .models import Cooks, Gallery, Company, Service, Testimonial, Post
from .serializers import CooksHomeSerializer, GallerySerializer, CompanySerializer, TestimonialSerializer, \
    ServiceSerializer, PostsListSerializer, PostsHomeSerializer


class DownloadImages(APIView):

    def get(self, request, pk):
        try:
            image = Gallery.objects.get(id=pk)
        except Gallery.DoesNotExist:
            raise NotFound(f"Image with id {pk} not found")  # Более понятное сообщение об ошибке

        image_file = image.image  # Объект файла (например, ImageField)

        # Определяем content_type через библиотеку mimetypes
        import mimetypes
        content_type, encoding = mimetypes.guess_type(image_file.path)

        if content_type is None:
            content_type = 'application/octet-stream'  # Стандартное значение, если не удалось определить тип файла

        response = FileResponse(image_file.open('rb'), content_type=content_type)
        response['Content-Disposition'] = f'attachment; filename="{image_file.name}"'

        return response


class CustomPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 10
    max_page_size = 100


class PostsListApiView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostsListSerializer
    pagination_class = CustomPagination


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
