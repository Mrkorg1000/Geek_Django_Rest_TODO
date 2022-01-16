from uuid import uuid4
from django.db import models


# Create your models here.
class User(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid4())
    user_name = models.CharField(max_length=64)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    birthday_year = models.PositiveIntegerField()
    email = models.EmailField(unique=True)
