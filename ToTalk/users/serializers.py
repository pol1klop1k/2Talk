from rest_framework import serializers
from .models import Decency

from django.contrib.auth import get_user_model
UserModel = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = UserModel.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email']
        )
        return user

    class Meta:
        model = UserModel
        fields = "__all__"
        extra_kwargs = {'password': {'write_only': True}, 'email': {'required': True}}
