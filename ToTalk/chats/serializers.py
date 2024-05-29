from rest_framework import serializers
from .models import Room, Category, Report, Messages
from users.serializers import UserSerializer, UserIconSerializer


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
        ret["owner"] = UserSerializer(instance.owner).data
        if ret["avatar"] and ret["avatar"][0] == '/':
            ret["avatar"] = "http://127.0.0.1:8000" + ret["avatar"]
        ret["icon"] = UserIconSerializer(instance.icon).data
        return ret


    class Meta:
        model = Room
        fields = "__all__"
        extra_kwargs = {"user": {"read_only": True}, "cat": {"read_only": True}, "owner": {"read_only": True}}


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = "__all__"


class MessagesSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret["user"] = UserSerializer(instance.user).data
        return ret
    

    class Meta:
        model = Messages
        fields = "__all__"
        extra_kwargs = {"time_send": {"read_only": True}, "user": {"read_only": True}, "room": {"read_only": True},}