# apps/services/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import ServiceRecord
from .serializers import ServiceRecordSerializer

class ServiceRecordViewSet(viewsets.ModelViewSet):
    serializer_class = ServiceRecordSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Retorna registros de serviço da oficina do usuário autenticado
        return ServiceRecord.objects.filter(workshop__owner=self.request.user)
