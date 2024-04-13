from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    description = models.CharField(max_length=255)
    decency = models.PositiveIntegerField(default=10000)