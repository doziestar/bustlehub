from django.db import models
from django.conf import settings


class TimeStamp(models.Model):
    """timestamp for all projects"""
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True
        

class General(models.Model):
    """abstract class for general info"""
    # author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=20, unique=True)
    excerpt = models.TextField(blank=True)
    
    class Meta:
        abstract=True
        

class Event(TimeStamp, General):
    """trying out drf"""
    detail = models.TextField(blank=True)
    view_count = models.IntegerField(default=0)
    venue = models.TextField(blank=True)
    positive_feed_back = models.IntegerField(default=0)
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural = "Event"
    

class Blog(TimeStamp, General):
    """trying out drf"""
    detail = models.TextField(blank=True)
    view_count = models.IntegerField(default=0)
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural = "Blog"