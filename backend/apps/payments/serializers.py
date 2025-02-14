# apps/payments/serializers.py
from rest_framework import serializers
from .models import PaymentTransaction

class PaymentTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentTransaction
        fields = ['id', 'subscription', 'user', 'amount', 'transaction_date', 'status']
