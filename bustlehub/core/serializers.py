from rest_framework import serializers

from bustlehub.core.models import Blog


class BlogSerializer(serializers.Serializer):
    class Meta:
        model = Blog
        fields = ("title", "slug")
