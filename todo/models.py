from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

class Todo(models.Model):
    user = models.ForeignKey(to=get_user_model(), on_delete=models.CASCADE,related_name="todos")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    datetime_created = models.DateTimeField(auto_now_add=True)
    datetime_modified = models.DateTimeField(auto_now=True)
    is_completed = models.BooleanField(default=False)
    is_soft_deleted = models.BooleanField(default=False)