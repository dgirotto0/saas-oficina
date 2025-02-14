# apps/workshops/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Workshop
from .serializers import WorkshopSerializer

class WorkshopViewSet(viewsets.ModelViewSet):
    serializer_class = WorkshopSerializer
    permission_classes = [IsAuthenticated]
    queryset = Workshop.objects.all()  # Adicionando o atributo queryset

    def get_queryset(self):
        # Retorna apenas as oficinas do usuário autenticado
        return self.queryset.filter(owner=self.request.user)
