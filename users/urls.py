from django.urls import path
from .views import UserViewSet
from rest_framework import routers

app_name = 'users'
router = routers.SimpleRouter()
router.register(r'', UserViewSet)
urlpatterns = router.urls



# urlpatterns = [
#     path('', UserViewSet.as_view({'get': 'list'})),
# ]
