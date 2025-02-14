# apps/services/models.py

from django.db import models
from apps.workshops.models import Workshop
from apps.customers.models import Customer
from apps.vehicles.models import Vehicle
from apps.products.models import Product

class ServiceRecord(models.Model):
    SERVICE_TYPE_CHOICES = [
        ('oil_change', 'Troca de Óleo'),
        # Outros serviços podem ser adicionados
    ]
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE, related_name='service_records')
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='service_records')
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='service_records')
    date = models.DateTimeField(auto_now_add=True)
    service_type = models.CharField(max_length=50, choices=SERVICE_TYPE_CHOICES)
    description = models.TextField(blank=True, null=True)
    mileage = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    products = models.ManyToManyField(Product, through='ServiceProduct', related_name='service_records')

    def __str__(self):
        return f"{self.service_type} on {self.date.strftime('%Y-%m-%d')}"

class ServiceProduct(models.Model):
    service_record = models.ForeignKey(ServiceRecord, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
