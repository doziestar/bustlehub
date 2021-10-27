from django.conf import settings
from django.db import models

"""
! Core app functionality
1. Front end rendering
2. All none protective pages
3. contact us form
4. newsletter --> 3rd party newsletter app

"""


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
        abstract = True


class Event(TimeStamp, General):
    """trying out drf"""

    detail = models.TextField(blank=True)
    view_count = models.IntegerField(default=0)
    venue = models.TextField(blank=True)
    positive_feed_back = models.IntegerField(default=0)
    like = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True)

    def __str__(self):
        return self.title

    @property
    def like_count(self):
        return self.like.all().count()

    class Meta:
        verbose_name_plural = "Event"


class Blog(TimeStamp, General):
    """trying out drf"""

    detail = models.TextField(blank=True)
    view_count = models.IntegerField(default=0)
    liked = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True)

    def __str__(self):
        return self.title

    @property
    def like_count(self):
        return self.liked.all().count()

    class Meta:
        verbose_name_plural = "Blog"
