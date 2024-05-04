from rest_framework import generics, viewsets
from rest_framework.views import APIView
from .serializers import RoomSerializer, CategorySerializer
from .models import Room, Category
from django.shortcuts import render

from django.contrib.auth import get_user_model
UserModel = get_user_model()

class CategoryReadViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class RoomViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        category_id = self.kwargs.get('cat_id')
        return Room.objects.filter(cat=category_id).select_related('cat')
    
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

def room(request, room_id):
    return render(request, "chats/room.html", {"room_name": room_id})