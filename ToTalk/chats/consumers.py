import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import Room, Messages
from users.serializers import UserSerializer


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_id = self.scope["url_route"]["kwargs"]["room_id"]
        self.room = Room.objects.get(pk=int(self.room_id))
        self.room_group_name = f"chat_{self.room_id}"

        # Join room group
        async_to_sync(self.channel_layer.group_add)(    
            self.room_group_name, self.channel_name
        )
        self.accept()

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "chat.join", "user": UserSerializer(self.scope["user"]).data}
        )

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "chat.message", "message": message, "sender": UserSerializer(self.scope["user"]).data}
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event["message"]
        sender = event["sender"]
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            "text": message,
            "user": sender,
            "type": "message"
            }))
        
    def chat_join(self, event):
        user = event["user"]
        # if user["id"] != self.scope["user"].id:
        # print(self.scope["user"].id)
        self.send(text_data=json.dumps({
            "user": user,
            "type": "join"
            }))