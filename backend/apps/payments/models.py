# apps/payments/models.py

from django.db import models
from apps.subscriptions.models import Subscription
from apps.users.models import CustomUser

class PaymentTransaction(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
    ]
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE, related_name='payments')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"Pagamento de {self.amount} em {self.transaction_date.strftime('%Y-%m-%d')}"
