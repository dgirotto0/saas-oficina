# apps/users/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'phone_number']

class UserRegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        error_messages={
            'invalid': 'Informe um email válido.',
            'blank': 'O email não pode ficar em branco.',
        }
    )
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        error_messages={
            'min_length': 'A senha deve ter pelo menos 8 caracteres.',
            'blank': 'A senha não pode ficar em branco.',
        }
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def validate_username(self, value):
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("Nome de usuário já existe.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Email já cadastrado.")
        return value

    def validate_password(self, value):
        # Verifica se a senha contém pelo menos um número e uma letra
        if not any(char.isdigit() for char in value):
            raise serializers.ValidationError("A senha deve conter pelo menos um número.")
        if not any(char.isalpha() for char in value):
            raise serializers.ValidationError("A senha deve conter pelo menos uma letra.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user