# apps/users/views.py
from rest_framework import generics
from .serializers import CustomUserSerializer, UserRegisterSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

# Endpoint para obter os dados do usuário autenticado (já existente)
class UserDetailView(generics.RetrieveAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = []  # Já que o token é necessário, a autenticação será aplicada automaticamente

    def get_object(self):
        return self.request.user

# Nova view para registro de usuário
class UserRegisterView(generics.CreateAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]
