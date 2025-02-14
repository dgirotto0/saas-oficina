# apps/workshops/test_workshops.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.users.models import CustomUser
from .models import Workshop

class WorkshopTests(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_superuser(
            username="dgirotto", email="dgirotto@example.com", password="Girotto20@"
        )
        # Efetua login usando a API ou diretamente definindo o usuário autenticado
        self.client.force_authenticate(user=self.user)
        # Cria uma oficina associada ao usuário
        self.workshop = Workshop.objects.create(
            owner=self.user, name="Oficina Teste", address="Rua Teste", phone="12345678", email="oficina@example.com"
        )
        self.url = reverse('workshop-list')  # Nome gerado pelo router para a list view

    def test_list_workshops(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Deve retornar pelo menos 1 oficina (a que foi criada no setUp)
        self.assertEqual(len(response.data), 1)
    
    def test_create_workshop(self):
        data = {
            "owner": self.user.id,  # Ou omitir, se o viewset setar automaticamente com request.user
            "name": "Nova Oficina",
            "address": "Rua Nova",
            "phone": "87654321",
            "email": "nova@example.com"
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "Nova Oficina")
