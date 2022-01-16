from django.db import models
from users.models import User
from projects.models import Project


# Create your models here.
class ToDo(models.Model):
    TODO_ACTIVE = 'A'
    TODO_DONE = 'D'

    TODO_CHOICES = [
        (TODO_ACTIVE, 'Active'),
        (TODO_DONE, 'Done'),
    ]

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    status = models.CharField(max_length=10, choices=TODO_CHOICES, default=TODO_ACTIVE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

