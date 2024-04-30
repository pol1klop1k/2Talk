from django.urls import path, include
from .views import RoomViewSet, CategoryReadViewSet
from rest_framework import routers

chats_router = routers.DefaultRouter()
chats_router.register(r'categories/(?P<cat_id>\d+)/rooms', RoomViewSet)
chats_router.register(r'categories', CategoryReadViewSet)

urlpatterns = [
    path('', include(chats_router.urls)),
    #path('rooms/', RoomViewSet.as_view({'get':'list'})),
    #path('rooms/', RoomViewSet.as_view({'post':'create'})),  
]