from uuid import uuid4
from django.db import models
from users.models import User

# Create your models here.


class Project(models.Model):
    name = models.CharField(max_length=64)
    repo_link = models.URLField()
    users = models.ManyToManyField(User)




















