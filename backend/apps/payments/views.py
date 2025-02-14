# apps/payments/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import PaymentTransaction
from .serializers import PaymentTransactionSerializer

class PaymentTransactionViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentTransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Retorna transações do usuário autenticado
        return PaymentTransaction.objects.filter(user=self.request.user)
