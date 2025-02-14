# apps/products/test_products.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.users.models import CustomUser
from apps.workshops.models import Workshop
from .models import Product

class ProductTests(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_superuser(
            username="dgirotto", email="dgirotto@example.com", password="Girotto20@"
        )
        self.client.force_authenticate(user=self.user)
        self.workshop = Workshop.objects.create(
            owner=self.user, name="Oficina Teste", address="Rua Teste", phone="12345678", email="oficina@example.com"
        )
        self.product = Product.objects.create(
            workshop=self.workshop, name="Óleo Premium", description="Óleo de alta qualidade", price=100.00, sku="SKU123"
        )
        self.url = reverse('product-list')

    def test_list_products(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
    
    def test_create_product(self):
        data = {
            "workshop": self.workshop.id,
            "name": "Filtro de Ar",
            "description": "Filtro de ar para melhor desempenho",
            "price": 50.00,
            "sku": "SKU456"
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "Filtro de Ar")
