from django import forms

from bustlehub.core.models import Blog


class CreatePostForm(forms.ModelForm):
    class Meta:
        model = Blog
        fields = ("title", "slug", "excerpt", "detail")
