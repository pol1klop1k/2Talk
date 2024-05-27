from rest_framework import generics, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RoomSerializer, CategorySerializer, ReportSerializer, MessagesSerializer
from .permissions import ReportPermission, RoomPermission, MessagesPermission
from .models import Room, Category, Report, Messages
from django.http import HttpResponseRedirect, Http404
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404, render
from rest_framework.response import Response

from django.contrib.auth import get_user_model
UserModel = get_user_model()

class CategoryReadViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class RoomViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        category_id = self.kwargs.get('cat_id')
        get_object_or_404(Category, pk=category_id)
        return Room.objects.filter(cat=category_id)
    

    def perform_create(self, serializer):
        category_id = self.kwargs.get('cat_id')
        get_object_or_404(Category, pk=category_id)
        serializer.save(owner=self.request.user, cat_id=self.kwargs.get('cat_id'), user=[self.request.user])


    @action(detail=True, methods=['post'])
    def join_room(self, request, pk=None, cat_id=None):
        user = request.user
        room = self.get_object()
        print(pk, cat_id)
        if user.user_decency.current >= room.required_decency and not(room.user.filter(pk=user.pk).exists()):
            room.user.add(user)
        # return HttpResponseRedirect(redirect_to=f'http://localhost:3000/categories/{cat_id}/rooms/{pk}/')
        return Response({"status": "ok"})
    

    @action(detail=True, methods=['post'])
    def left_room(self, request, pk=None, cat_id=None):
        user = request.user
        room = self.get_object()
        if room.user.filter(pk=user.pk).exists():
            room.user.remove(user)
        #return HttpResponseRedirect(redirect_to='http://google.com')
    

    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = (RoomPermission,)


class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = (ReportPermission,)


class MessagesViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        room_id = self.kwargs.get('room_id')
        return Messages.objects.filter(room=room_id)
    

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, room_id=self.kwargs.get('room_id'))
    

    queryset = Messages.objects.all()
    serializer_class = MessagesSerializer
    permission_classes = (MessagesPermission,)

def room(request, room_id):
    return render(request, "chats/room.html", {"room_name": room_id})