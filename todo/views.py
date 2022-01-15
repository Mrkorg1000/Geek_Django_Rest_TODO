from rest_framework.viewsets import ModelViewSet
from .models import ToDo
from .serializers import ToDoSerializer


# Create your views here.
class ToDoViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
