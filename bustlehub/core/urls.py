from django.urls import path
from .views import BlogDetailView, BlogListView, EventDetailView, EventListView

app_name = "core"
urlpatterns = [
    path("blog/", BlogListView.as_view(), name="blog"),
    path("blog/<slug:slug>/", BlogDetailView.as_view(), name="blog-detail"),
    path("event/", EventListView.as_view(), name="event"),
    path("event/<slug:slug>/", EventDetailView.as_view(), name="event-detail")
]