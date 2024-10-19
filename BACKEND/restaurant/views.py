from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Menu, Cooks, Gallery, Rating, Company, Feedback, Service, Testimonial, Post
from .serializers import MenuListSerializer, MenuHomeSerializer, CooksHomeSerializer, \
    GallerySerializer, CompanySerializer, FeedbackSerializer, TestimonialSerializer, ServiceSerializer, \
    PostsListSerializer, PostsHomeSerializer


class SubmitRatingView(APIView):

    def post(self, request, menu_id):
        try:
            menu = Menu.objects.get(id=menu_id)
            rating_value = request.data.get('rating')

            if not rating_value or int(rating_value) not in range(1, 6):  # Ensure rating is between 1 and 5
                return Response({"error": "Invalid rating value"}, status=status.HTTP_400_BAD_REQUEST)

            ip_address = request.META.get('REMOTE_ADDR')

            rating, created = Rating.objects.update_or_create(
                menu=menu,
                ip_address=ip_address,
                defaults={'rating': rating_value}
            )

            return Response({"message": "Rating submitted successfully"}, status=status.HTTP_200_OK)

        except Menu.DoesNotExist:
            return Response({"error": "Menu not found"}, status=status.HTTP_404_NOT_FOUND)


class MenuListApiView(generics.ListAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuListSerializer


class MenuDetailApiView(generics.RetrieveAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuListSerializer



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


class FeedbackCreateApiView(generics.CreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer


class MenuHomeListApiView(generics.ListAPIView):
    queryset = Menu.objects.filter(home_select=True)[:3]
    serializer_class = MenuHomeSerializer


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
