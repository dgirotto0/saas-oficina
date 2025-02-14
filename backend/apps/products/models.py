# apps/products/models.py

from django.db import models
from apps.workshops.models import Workshop

class Product(models.Model):
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    sku = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
