from rest_framework import serializers
from .models import Room, Category
from users.serializers import UserSerializer

from django.contrib.auth import get_user_model

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class RoomSerializer(serializers.ModelSerializer):
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret["user"] = UserSerializer(instance.user, many=True).data
        ret["cat"] = CategorySerializer(instance.cat).data
        return ret


    class Meta:
        model = Room
        fields = "__all__"
        extra_kwargs = {"user": {"read_only": True}}

