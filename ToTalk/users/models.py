from typing import Any
from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

# Create your models here.
class CustomUserManager(UserManager):
    def create_user(self, username, email=None, password=None, **extra_fields):
        user = super().create_user(
            username=username, 
            password=password,
            email=email,
            **extra_fields
            )
        decency = Decency.objects.create(user=user)
        decency.save()
        return user
    

    def create_superuser(self, username: str, email: str | None, password: str | None, **extra_fields: Any) -> Any:
        user = super().create_superuser(username, email, password, **extra_fields)
        decency = Decency.objects.create(user=user)
        decency.save()
        return user

class User(AbstractUser):
    objects = CustomUserManager()
    description = models.CharField(max_length=255, blank=True)
    avatar = models.ImageField(upload_to="users/avatars/", blank=True)

class Decency(models.Model):
    last_update_date = models.DateField(auto_now_add=True)
    last_month = models.PositiveIntegerField(default=None, null=True, blank=True)
    last_2_weeks = models.PositiveIntegerField(default=None, null=True, blank=True)
    current = models.PositiveIntegerField(default=10000)
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=None, related_name="user_decency")

class UserIcon(models.Model):
    name = models.CharField(max_length=32)
    picture = models.ImageField(upload_to="users/pictures/")