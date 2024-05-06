from rest_framework import permissions
from .models import Room
from django.shortcuts import get_object_or_404
from django.http import Http404

class RoomPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if view.action in ["list", "retrieve", "join_room", "left_room"]:
            return request.user.is_authenticated
        elif view.action in ['destroy', 'create']:
            return True
        else:
            return False
                                                                                                
    def has_object_permission(self, request, view, obj):
        # Deny actions on objects if the user is not authenticated
        if view.action in ["retrieve", "join_room", "left_room"]:
            return True
        elif view.action in ['destroy']:
            return obj.owner == request.user or request.user.is_staff
        else:
            return False
        

class MessagesPermission(permissions.BasePermission):
    
    def has_permission(self, request, view):
        if view.action in ["list", "create"]:
            room = get_object_or_404(Room, pk=view.kwargs.get("room_id"))
            if int(room.cat_id) != int(view.kwargs.get('cat_id')):
                raise Http404
            user = request.user
            return request.user.is_authenticated and room.user.filter(pk=user.pk).exists()
        else:
            return False


class ReportPermission(permissions.BasePermission):
    
    def has_permission(self, request, view):
        if view.action in ["list", "retrieve"]:
            return request.user.is_authenticated
        elif view.action in ['destroy', 'create']:
            return True
        else:
            return False
                                                                                                
    def has_object_permission(self, request, view, obj):
        # Deny actions on objects if the user is not authenticated
        print(view.action)
        if view.action == "retrieve":
            return True
        elif view.action in ['destroy']:
            return obj == request.user or request.user.is_staff
        else:
            return False