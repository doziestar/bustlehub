from rest_framework import serializers
from bustlehub.core.models import Blog, Event

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = [
            'title',
            # "author",
            "created_at",
            "modified_at",
            "slug",
            "excerpt",
            "detail",
            "view_count"
            ]
    
    def create(self, validated_data):
        """create blogs and try things"""
        return Blog.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        """updating the info"""
    

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            'title', 
            # "author",
            "created_at",
            "modified_at",
            "slug", "excerpt",
            "detail", 
            "view_count",
            "venue",
            "positive_feed_back",
            ]
        
    def create(self, validated_data):
        """create blogs and try things"""
        return Event.objects.create(**validated_data)