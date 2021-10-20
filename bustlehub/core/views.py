from django.shortcuts import render
from django.views import generic

from bustlehub.core.models import Blog, Event

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