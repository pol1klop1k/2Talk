from django.db import models
from users.models import User

# Create your models here.
class Category(models.Model):
    title = models.CharField(max_length=32)

    def __str__(self):
        return self.title
    

class Room(models.Model):
    cat = models.ForeignKey('Category', on_delete=models.CASCADE)
    name = models.CharField(max_length=32)
    time_create = models.DateTimeField(auto_now_add=True)
    user = models.ManyToManyField(User, blank=True)

    def __str__(self):
        return self.name

class Messages(models.Model):
    text = models.TextField(blank=False)
    time_send = models.DateTimeField(auto_now_add=True)
    room = models.ForeignKey('Room', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.user