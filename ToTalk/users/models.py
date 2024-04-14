from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    description = models.CharField(max_length=255)
    decency = models.OneToOneField('Decency', on_delete=models.CASCADE, null=True)

class Decency(models.Model):
    last_update_date = models.DateField(auto_now_add=True)
    last_month = models.PositiveIntegerField(default=None, null=True)
    last_2_weeks = models.PositiveIntegerField(default=None, null=True)
    current = models.PositiveIntegerField(default=10000)