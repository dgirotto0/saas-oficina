# apps/customers/models.py

from django.db import models
from apps.workshops.models import Workshop

class Customer(models.Model):
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE, related_name='customers')
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
