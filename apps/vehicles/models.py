# apps/vehicles/models.py

from django.db import models
from apps.customers.models import Customer

class Vehicle(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='vehicles')
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.PositiveIntegerField()
    vin = models.CharField(max_length=100, blank=True, null=True)
    license_plate = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.make} {self.model} - {self.license_plate}"
