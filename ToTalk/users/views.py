from rest_framework import generics, viewsets
from rest_framework.views import APIView
from .serializers import UserSerializer
from .permissions import UserPermission
from rest_framework.response import Response
from .serializers import UserSerializer
from django.http import HttpResponse
from .chatsserializers import UserIdentifySerializer

from django.contrib.auth import get_user_model
UserModel = get_user_model()

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = UserModel.objects.all().select_related('user_decency')
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

class IdentifyView(APIView):
    def get(self, request):
        user = request.user
        if user.is_authenticated:
            return Response(UserIdentifySerializer(user).data)
        return HttpResponse("Unauthorized", status=401)