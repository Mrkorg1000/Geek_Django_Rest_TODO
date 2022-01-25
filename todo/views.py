from django_filters import filterset
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from .models import ToDo
from .serializers import ToDoSerializer


# Create your views here.

class ToDoViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['project', 'status']

    def destroy(self, request, *args, **kwargs):
        todo_obj = self.get_object()
        todo_obj.status = 'D'
        todo_obj.save()
        return Response(status=status.HTTP_200_OK)



