# apps/vehicles/test_vehicles.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.users.models import CustomUser
from apps.workshops.models import Workshop
from apps.customers.models import Customer
from .models import Vehicle

class VehicleTests(APITestCase):
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
        self.vehicle = Vehicle.objects.create(
            customer=self.customer, make="Toyota", model="Corolla", year=2020, vin="VIN123", license_plate="ABC-1234"
        )
        self.url = reverse('vehicle-list')

    def test_list_vehicles(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
    
    def test_create_vehicle(self):
        data = {
            "customer": self.customer.id,
            "make": "Honda",
            "model": "Civic",
            "year": 2021,
            "vin": "VIN456",
            "license_plate": "DEF-5678"
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["make"], "Honda")
