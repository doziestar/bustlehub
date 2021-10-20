from django.urls import path
from .views import BlogListApiView, BlogDetailApiView, EventListApiView


app_name="api"
urlpatterns = [
    path("blog/", BlogListApiView.as_view(), name="blog-api"),
    path("blog/<slug:id>/", BlogDetailApiView.as_view(), name="blog-detail"),
    path("event/", EventListApiView.as_view(), name="event")
]