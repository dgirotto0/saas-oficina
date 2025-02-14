# apps/products/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Retorna produtos da oficina do usuário autenticado
        return Product.objects.filter(workshop__owner=self.request.user)
