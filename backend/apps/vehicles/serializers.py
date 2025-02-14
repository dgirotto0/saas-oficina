# apps/vehicles/serializers.py
from rest_framework import serializers
from .models import Vehicle

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ['id', 'customer', 'make', 'model', 'year', 'vin', 'license_plate']
