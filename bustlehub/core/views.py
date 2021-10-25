# from django.core import serializers
from django.http import JsonResponse
from django.shortcuts import render
from django.views import generic

from bustlehub.core.forms import CreatePostForm
from bustlehub.core.models import Blog, Event

# from django.views.decorators.csrf import csrf_exempt


class BlogDetailView(generic.DetailView):
    template_name = "core/blog_detail.html"
    model = Blog
    context_object_name = "blog"


class BlogListView(generic.ListView):
    template_name = "core/blog_list.html"
    model = Blog
    context_object_name = "blog"


class EventDetailView(generic.DetailView):
    template_name = "core/event_list.html"
    model = Event
    context_object_name = "event"


class EventListView(generic.DetailView):
    template_name = "core/event_detail.html"
    model = Event
    context_object_name = "event"


def test_ajax(request):
    return JsonResponse({"text": "I am Dozie"})


def load_post_data_view(request, num_posts):
    qs = Blog.objects.all()
    visible = 3
    size = qs.count()
    upper = num_posts
    lower = upper - visible
    data = []
    for objects in qs:
        item = {
            "id": objects.id,
            "title": objects.title,
            "slug": objects.slug,
            "liked": True if request.user in objects.liked.all() else False,
            "like_count": objects.like_count,
            "excerpt": objects.excerpt,
            "detail": objects.detail,
            "view_count": objects.view_count,
        }
        data.append(item)
    return JsonResponse({"data": data[lower:upper], "size": size})


# @csrf_exempt
def like_and_unlike_post(request):
    if request.is_ajax():
        pk = request.POST.get("pk")
        obj = Blog.objects.get(pk=pk)
        if request.user in obj.liked.all():
            liked = False
            obj.liked.remove(request.user)
        else:
            liked = True
            obj.liked.add(request.user)
    return JsonResponse(
        {
            "liked": liked,
            "like_count": obj.like_count,
        }
    )


def create_new_post(request):
    form = CreatePostForm
    # qs = Blog.objects.all()

    if request.is_ajax() and form.is_valid():
        instance = form.save(commit=False)
        instance.save()
    context = {
        "form": form,
    }
    return render(request, "pages/home.html", context)


def load_event(request, num_event):
    qs = Event.objects.all()
    visible = 2
    size = qs.count()
    upper = num_event
    lower = upper - visible
    data = []
    for obj in qs:
        item = {
            "id": obj.id,
            "title": obj.title,
            "slug": obj.slug,
            "liked": True if request.user in obj.like.all() else False,
            "like_count": obj.like_count,
            "excerpt": obj.excerpt,
            "detail": obj.detail,
            "view_count": obj.view_count,
        }
        data.append(item)
    context = {"data": data[lower:upper], "size": size}
    return JsonResponse(context)


def load_event_temp(request):
    return render(request, "core/event_list.html", {})
