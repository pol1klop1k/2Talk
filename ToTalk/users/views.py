from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from .serializers import UserSerializer
from .models import Decency

from django.contrib.auth import get_user_model
UserModel = get_user_model()

# Create your views here.
class UserCreateView(generics.CreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer


class UserListView(generics.ListAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer