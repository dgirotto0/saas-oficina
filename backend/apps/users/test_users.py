# apps/users/tests.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import CustomUser

class AuthTest(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_superuser(
            username="dgirotto", 
            email="dgirotto00@gmail.com", 
            password="Girotto20@"
        )

    def test_token_auth(self):
        url = reverse('token_obtain_pair')  # Nome da URL definido no users/urls.py
        data = {
            "username": "dgirotto",
            "password": "Girotto20@"
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
