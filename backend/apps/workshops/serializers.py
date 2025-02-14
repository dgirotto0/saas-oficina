# apps/workshops/serializers.py
from rest_framework import serializers
from .models import Workshop

class WorkshopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workshop
        fields = ['id', 'owner', 'name', 'address', 'phone', 'email']
