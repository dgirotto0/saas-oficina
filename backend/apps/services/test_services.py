# apps/services/test_services.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.users.models import CustomUser
from apps.workshops.models import Workshop
from apps.customers.models import Customer
from apps.vehicles.models import Vehicle
from .models import ServiceRecord

class ServiceRecordTests(APITestCase):
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
        self.service_record = ServiceRecord.objects.create(
            workshop=self.workshop,
            customer=self.customer,
            vehicle=self.vehicle,
            service_type="oil_change",
            description="Troca de óleo",
            mileage=15000,
            price=250.00
        )
        self.url = reverse('service-record-list')

    def test_list_service_records(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
    
    def test_create_service_record(self):
        data = {
            "workshop": self.workshop.id,
            "customer": self.customer.id,
            "vehicle": self.vehicle.id,
            "service_type": "oil_change",
            "description": "Nova troca de óleo",
            "mileage": 20000,
            "price": 300.00
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["price"], "300.00")  # Observe a formatação do Decimal em string
