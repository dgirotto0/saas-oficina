# apps/subscriptions/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Subscription
from .serializers import SubscriptionSerializer

class SubscriptionViewSet(viewsets.ModelViewSet):
    serializer_class = SubscriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Retorna assinaturas do usuário autenticado
        return Subscription.objects.filter(user=self.request.user)
