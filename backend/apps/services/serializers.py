# apps/services/serializers.py
from rest_framework import serializers
from .models import ServiceRecord, ServiceProduct

class ServiceProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceProduct
        fields = ['id', 'product', 'quantity', 'unit_price']

class ServiceRecordSerializer(serializers.ModelSerializer):
    # Representação aninhada dos produtos utilizados
    products = ServiceProductSerializer(many=True, read_only=True)
    
    class Meta:
        model = ServiceRecord
        fields = ['id', 'workshop', 'customer', 'vehicle', 'date', 'service_type', 'description', 'mileage', 'price', 'products']
