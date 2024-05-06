from django.urls import path, include
from .views import RoomViewSet, CategoryReadViewSet, ReportViewSet
from rest_framework import routers
from .views import room

chats_router = routers.DefaultRouter()
chats_router.register(r'categories/(?P<cat_id>\d+)/rooms', RoomViewSet)
chats_router.register(r'categories', CategoryReadViewSet)
chats_router.register(r'report', ReportViewSet)

urlpatterns = [
    path('', include(chats_router.urls)),
    #path('rooms/', RoomViewSet.as_view({'get':'list'})),
    #path('rooms/', RoomViewSet.as_view({'post':'create'})),
    path('room/<int:room_id>/', room, name="room"),  
]