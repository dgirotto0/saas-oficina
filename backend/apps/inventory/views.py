# apps/inventory/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Inventory
from .serializers import InventorySerializer

class InventoryViewSet(viewsets.ModelViewSet):
    serializer_class = InventorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Retorna o estoque da oficina do usuário autenticado
        return Inventory.objects.filter(workshop__owner=self.request.user)
