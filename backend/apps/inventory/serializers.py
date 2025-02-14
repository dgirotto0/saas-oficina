# apps/inventory/serializers.py
from rest_framework import serializers
from .models import Inventory

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = ['id', 'product', 'workshop', 'quantity', 'min_threshold']
