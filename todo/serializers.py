from rest_framework import serializers
from .models import ToDo


class ToDoSerializer(serializers.ModelSerializer):
    user = serializers.CharField()

    class Meta:
        model = ToDo
        fields = ['id', 'project', 'user', 'text', 'status', 'created_at', 'updated_at']




