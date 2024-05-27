from rest_framework import serializers
from .models import Decency, UserIcon

from django.contrib.auth import get_user_model
UserModel = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = UserModel.objects.create_user(
            username=validated_data.pop('username'),
            password=validated_data.pop('password'),
            email=validated_data.pop('email'),
            **validated_data
        )
        return user

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret["user_decency"] = DecencySerializer(instance.user_decency).data
        return ret

    class Meta:
        model = UserModel
        fields = "__all__"
        extra_kwargs = {'password': {'write_only': True}, 'email': {'required': True}}
        read_only_fields = ["last_login", "is_superuser", "is_staff", "is_active", "date_joined", "groups", "user_permissions"]


class DecencySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Decency
        fields = "__all__"

class UserIconSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserIcon
        fields = "__all__"
        read_only_fields = ["name", "picture"]