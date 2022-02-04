from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_name', 'first_name', 'last_name', 'email', 'birthday_year']


class UserSerializerShort(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_name', 'email']
