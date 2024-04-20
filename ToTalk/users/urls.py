from django.urls import path, include
from .views import UserCreateView, UserListView

urlpatterns = [
    path('users/', UserListView.as_view()),
    path('register/', UserCreateView.as_view()),
    path('', include('rest_framework.urls')),
]