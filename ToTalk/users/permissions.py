from rest_framework import permissions

class UserPermission(permissions.BasePermission):
    
    def has_permission(self, request, view):
        if view.action in ["list", "retrieve"]:
            return request.user.is_authenticated
        elif view.action in ['update', 'partial_update', 'destroy', 'create']:
            return True
        else:
            return False
                                                                                                
    def has_object_permission(self, request, view, obj):
        # Deny actions on objects if the user is not authenticated
        if view.action == "retrieve":
            return True
        elif view.action in ['update', 'partial_update', 'destroy']:
            return obj == request.user or request.user.is_staff
        else:
            return False