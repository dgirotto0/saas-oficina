# apps/vehicles/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Vehicle
from .serializers import VehicleSerializer

class VehicleViewSet(viewsets.ModelViewSet):
    serializer_class = VehicleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Retorna os veículos dos clientes das oficinas do usuário autenticado
        return Vehicle.objects.filter(customer__workshop__owner=self.request.user)
