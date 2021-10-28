from django.urls import path

from bustlehub.core.views import (
    BlogDetailView,
    BlogListView,
    EventDetailView,
    EventListView,
    blog_detail,
    create_new_post,
    like_and_unlike_post,
    load_event,
    load_event_temp,
    load_post_data_view,
    test_ajax,
)

app_name = "core"
urlpatterns = [
    path("blog/", BlogListView.as_view(), name="blog"),
    path("<slug:slug>/", BlogDetailView.as_view(), name="blog-detail"),
    path("<slug:slug>/data/", blog_detail, name="blog-detail-data"),
    path("event/", EventListView.as_view(), name="event"),
    path("event/<slug:slug>/", EventDetailView.as_view(), name="event-detail"),
    path("text/", test_ajax, name="text"),
    path("load-blog/<int:num_posts>", load_post_data_view, name="load-blog"),
    path("load-event/<int:num_event>", load_event, name="load-event"),
    path("load-event/", load_event_temp, name="load-event-temp"),
    path("like-unlike/", like_and_unlike_post, name="like-unlike"),
    path("", create_new_post, name="create-post"),
]
