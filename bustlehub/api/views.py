from django.shortcuts import render
from rest_framework import generics
from .serializers import BlogSerializer, EventSerializer
from bustlehub.core.models import Blog, Event

class BlogListApiView(generics.ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer


class BlogDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

class EventListApiView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventDetailApiView():
    pass
