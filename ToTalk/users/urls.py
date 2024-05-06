from django.urls import path, include
from .views import UserViewSet

from rest_framework import routers

user_router = routers.DefaultRouter()
user_router.register(r'', UserViewSet)

urlpatterns = [
    path('auth/', include('rest_framework.urls')),
    path('', include(user_router.urls)),
    #path('users/', UserListView.as_view()),
    #path('register/', UserCreateView.as_view()),
    
]