from rest_framework import permissions

class RoomPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        print(view.action)
        if view.action in ["list", "retrieve", "join_room"]:
            print("we here")
            return request.user.is_authenticated
        elif view.action in ['destroy', 'create']:
            return True
        else:
            return False
                                                                                                
    def has_object_permission(self, request, view, obj):
        # Deny actions on objects if the user is not authenticated
        if view.action in ["retrieve", "join_room"]:
            return True
        elif view.action in ['destroy']:
            return obj.owner == request.user or request.user.is_staff
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