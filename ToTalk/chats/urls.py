from django.urls import path, include
from .views import RoomViewSet, CategoryReadViewSet, ReportViewSet, MessagesViewSet
from rest_framework import routers
from .views import room

chats_router = routers.DefaultRouter()
chats_router.register(r'categories/(?P<cat_id>\d+)/rooms', RoomViewSet)
chats_router.register(r'categories', CategoryReadViewSet)
chats_router.register(r'reports', ReportViewSet)
chats_router.register(r'categories/(?P<cat_id>\d+)/rooms/(?P<room_id>\d+)/messages', MessagesViewSet)

urlpatterns = [
    path('', include(chats_router.urls)),
    #path('rooms/', RoomViewSet.as_view({'get':'list'})),
    #path('rooms/', RoomViewSet.as_view({'post':'create'})),
    path('room/<int:room_id>/', room, name="room"),  
]