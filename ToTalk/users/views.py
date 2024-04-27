from rest_framework import generics, viewsets
from rest_framework.views import APIView
from .serializers import UserSerializer
from .permissions import UserPermission

from django.contrib.auth import get_user_model
UserModel = get_user_model()

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    permission_classes = (UserPermission,)

'''
class UserCreateView(generics.CreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer


class UserListView(generics.ListAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
'''