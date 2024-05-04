from rest_framework import generics, viewsets
from rest_framework.views import APIView
from .serializers import RoomSerializer, CategorySerializer, ReportSerializer
from .permissions import ReportPermission, RoomPermission
from .models import Room, Category, Report
from django.http import HttpResponseRedirect
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth import get_user_model
UserModel = get_user_model()

class CategoryReadViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class RoomViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        category_id = self.kwargs.get('cat_id')
        return Room.objects.filter(cat=category_id)
    
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = (RoomPermission,)


    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return HttpResponseRedirect(redirect_to='https://google.com')
    

    def perform_create(self, serializer):
            serializer.save(owner=self.request.user, cat_id=self.kwargs.get('cat_id'))


    @action(detail=True, methods=['post'])
    def join_room(self, request, pk=None, cat_id=None):
        user = request.user
        room = self.get_object()
        if user.user_decency.current >= room.required_decency and not(room.user.filter(pk=user.pk).exists()):
            room.user.add(user)
        return HttpResponseRedirect(redirect_to='https://google.com')


    

class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = (ReportPermission,)