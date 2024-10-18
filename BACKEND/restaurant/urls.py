from django.urls import path
from .views import MenuHomeListApiView, CooksHomeListApiView, GalleryHomeListApiView, TestimonialsHomeListApiView, \
    ServicesHomeListApiView, MenuListApiView, MenuDetailApiView, PostsListApiView, PostDetailApiView, \
    GalleryListApiView, CompanyListApiView, FeedbackCreateApiView, \
    PostsHomeListApiView

urlpatterns = [
    path('home/menu', MenuHomeListApiView.as_view(), name='home-menu'),
    path('home/cooks', CooksHomeListApiView.as_view(), name='home-cooks'),
    path('home/posts', PostsHomeListApiView.as_view(), name='home-posts'),
    path('home/gallery', GalleryHomeListApiView.as_view(), name='home-gallery'),
    path('home/testimonials', TestimonialsHomeListApiView.as_view(), name='home-gallery'),
    path('home/services', ServicesHomeListApiView.as_view(), name='home-gallery'),
    path('menu', MenuListApiView.as_view(), name='menu-list'),
    path('menu/<int:pk>', MenuDetailApiView.as_view(), name='menu'),
    # path('menu/<int:pk>/rate', SubmitRatingView.as_view(), name='submit-rating'),
    path('posts', PostsListApiView.as_view(), name='posts'),
    path('posts/<int:pk>', PostDetailApiView.as_view(), name='post'),
    path('gallery', GalleryListApiView.as_view(), name='gallery'),
    path('feedback-form', FeedbackCreateApiView.as_view(), name='feedback'),
    path('contacts', CompanyListApiView.as_view(), name='contacts'),

]


