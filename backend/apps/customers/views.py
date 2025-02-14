# apps/customers/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Customer
from .serializers import CustomerSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Retorna somente os clientes da oficina do usuário autenticado
        return Customer.objects.filter(workshop__owner=self.request.user)
