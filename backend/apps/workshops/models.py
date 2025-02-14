# apps/workshops/models.py

from django.db import models
from apps.users.models import CustomUser

class Workshop(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='workshops')
    name = models.CharField(max_length=255)
    address = models.TextField()
    phone = models.CharField(max_length=20)
    email = models.EmailField()

    def __str__(self):
        return self.name
