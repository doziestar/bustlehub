# Generated by Django 3.1.13 on 2021-10-20 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Blog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=100)),
                ('slug', models.SlugField(max_length=20, unique=True)),
                ('excerpt', models.TextField(blank=True)),
                ('detail', models.TextField(blank=True)),
                ('view_count', models.IntegerField(default=0)),
            ],
            options={
                'verbose_name_plural': 'Event',
            },
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=100)),
                ('slug', models.SlugField(max_length=20, unique=True)),
                ('excerpt', models.TextField(blank=True)),
                ('detail', models.TextField(blank=True)),
                ('view_count', models.IntegerField(default=0)),
                ('venue', models.TextField(blank=True)),
                ('positive_feed_back', models.IntegerField(default=0)),
            ],
            options={
                'verbose_name_plural': 'Event',
            },
        ),
    ]