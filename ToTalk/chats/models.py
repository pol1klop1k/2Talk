from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth import get_user_model
User = get_user_model()
# Create your models here.
class Category(models.Model):
    title = models.CharField(max_length=32, unique=True)

    def __str__(self):
        return self.title
    

class Room(models.Model):
    cat = models.ForeignKey('Category', on_delete=models.CASCADE, related_name="category_rooms")
    name = models.CharField(max_length=32, unique=True)
    time_create = models.DateTimeField(auto_now_add=True)
    user = models.ManyToManyField(User, blank=True, related_name="user_rooms")
    required_decency = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(10000)])

    def __str__(self):
        return self.name

class Messages(models.Model):
    text = models.TextField(blank=False)
    time_send = models.DateTimeField(auto_now_add=True)
    room = models.ForeignKey('Room', on_delete=models.CASCADE, related_name="room_messages")
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name="user_messages")

    def __str__(self):
        return self.user
    
class Report(models.Model):
    text = models.TextField(blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_reports")