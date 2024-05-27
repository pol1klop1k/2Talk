from rest_framework import serializers
from .serializers import DecencySerializer
from chats.serializers import RoomSerializer

from django.contrib.auth import get_user_model
UserModel = get_user_model()

class UserIdentifySerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret["user_decency"] = DecencySerializer(instance.user_decency).data
        return ret

    user_rooms = RoomSerializer(many=True, read_only=True)

    class Meta:
        model = UserModel
        fields = ["username", "password", "email", "last_login", "is_superuser", "is_staff", "is_active", "date_joined", "groups", "user_permissions", "user_rooms"]
        extra_kwargs = {'password': {'write_only': True}, 'email': {'required': True}}
        read_only_fields = ["last_login", "is_superuser", "is_staff", "is_active", "date_joined", "groups", "user_permissions"]