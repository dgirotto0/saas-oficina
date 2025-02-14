# apps/inventory/models.py

from django.db import models
from apps.products.models import Product
from apps.workshops.models import Workshop

class Inventory(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='inventories')
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE, related_name='inventories')
    quantity = models.PositiveIntegerField(default=0)
    min_threshold = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Estoque de {self.product.name} - {self.quantity}"
