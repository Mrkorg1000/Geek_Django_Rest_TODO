import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import ProjectViewSet
from .models import Project


# Create your tests here.
class TestProjectViewSet(TestCase):
    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/projects/', {'name': 'todo_project', 'repo_link': 'https://github.com/Mrkorg1000'
                                                                                       '/geekshop'}, format='json')
        view = ProjectViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/projects/', {'name': 'todo_project', 'repo_link': 'https://github.com/Mrkorg1000'
                                                                                       '/geekshop'}, format='json')
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        force_authenticate(request, admin)
        view = ProjectViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        project = Project.objects.create(name='todo_project', repo_link='https://github.com/Mrkorg1000'
                                                                        '/geekshop')
        client = APIClient()
        response = client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        project = Project.objects.create(name='todo_project', repo_link='https://github.com/Mrkorg1000'
                                                                        '/geekshop')
        client = APIClient()
        response = client.put(f'/api/projects/{project.id}/',
                              {'name': 'todo_project_1', 'repo_link': 'https://github.com/Mrkorg1000'
                                                                      '/geekshop_1'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        project = Project.objects.create(name='todo_project', repo_link='https://github.com/Mrkorg1000'
                                                                        '/geekshop')
        client = APIClient()
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        client.login(username='admin', password='admin123456')
        response = client.put(f'/api/projects/{project.id}/', {'name': 'todo_project_1', 'repo_link': 'https://github'
                                                                                                      '.com'
                                                                                                      '/Mrkorg1000'
                                                                                                      '/geekshop_1'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name, 'todo_project_1')
        self.assertEqual(project.repo_link, 'https://github.com/Mrkorg1000/geekshop_1')
        client.logout()


class TestProject1ViewSet(APITestCase):

    def test_edit_mixer(self):
        project = mixer.blend(Project)
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/projects/{project.id}/', {'name': 'todo_project_1', 'repo_link': 'https://github.com/Mrkorg1000/geekshop_1'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name, 'todo_project_1')
