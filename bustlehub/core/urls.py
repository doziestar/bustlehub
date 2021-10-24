from django.urls import path

from bustlehub.core.views import (
    BlogDetailView,
    BlogListView,
    EventDetailView,
    EventListView,
    like_and_unlike_post,
    load_post_data_view,
    test_ajax,
)

app_name = "core"
urlpatterns = [
    path("blog/", BlogListView.as_view(), name="blog"),
    path("blog/<slug:slug>/", BlogDetailView.as_view(), name="blog-detail"),
    path("event/", EventListView.as_view(), name="event"),
    path("event/<slug:slug>/", EventDetailView.as_view(), name="event-detail"),
    path("text/", test_ajax, name="text"),
    path("load-blog/<int:num_posts>", load_post_data_view, name="load-blog"),
    path("like-unlike/", like_and_unlike_post, name="like-unlike"),
]
