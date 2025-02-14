# apps/customers/test_customers.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.users.models import CustomUser
from apps.workshops.models import Workshop
from .models import Customer

class CustomerTests(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_superuser(
            username="dgirotto", email="dgirotto@example.com", password="Girotto20@"
        )
        self.client.force_authenticate(user=self.user)
        self.workshop = Workshop.objects.create(
            owner=self.user, name="Oficina Teste", address="Rua Teste", phone="12345678", email="oficina@example.com"
        )
        self.customer = Customer.objects.create(
            workshop=self.workshop, name="Cliente Teste", phone="99999999", email="cliente@example.com"
        )
        self.url = reverse('customer-list')  # Gerado pelo router

    def test_list_customers(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
    
    def test_create_customer(self):
        data = {
            "workshop": self.workshop.id,
            "name": "Novo Cliente",
            "phone": "88888888",
            "email": "novo@example.com"
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "Novo Cliente")
