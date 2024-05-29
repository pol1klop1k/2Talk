from rest_framework import generics, viewsets
from rest_framework.views import APIView
from .serializers import UserSerializer, UserIconSerializer
from .permissions import UserPermission
from rest_framework.response import Response
from django.http import HttpResponse
from .chatsserializers import UserIdentifySerializer
from .models import UserIcon

from django.contrib.auth import get_user_model
UserModel = get_user_model()

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    # queryset = UserModel.objects.all().select_related('user_decency')
    queryset = UserModel.objects.all().select_related('user_decency').prefetch_related("user_rooms")
    serializer_class = UserIdentifySerializer
    permission_classes = (UserPermission,)

'''
class UserCreateView(generics.CreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer


class UserListView(generics.ListAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
'''

class IdentifyView(APIView):
    def get(self, request):
        user = request.user
        if user.is_authenticated:
            return Response(UserIdentifySerializer(user).data)
        return HttpResponse("Unauthorized", status=401)
    
class UserIconReadOnlyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = UserIcon.objects.all()
    serializer_class = UserIconSerializer