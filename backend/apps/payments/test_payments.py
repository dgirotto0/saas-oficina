# apps/payments/test_payments.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.users.models import CustomUser
from apps.subscriptions.models import Subscription
from .models import PaymentTransaction

class PaymentTests(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_superuser(
            username="dgirotto", email="dgirotto@example.com", password="Girotto20@"
        )
        self.client.force_authenticate(user=self.user)
        # Cria uma assinatura para o usuário
        self.subscription = Subscription.objects.create(
            user=self.user, plan="free_trial", status="active"
        )
        self.payment = PaymentTransaction.objects.create(
            subscription=self.subscription, user=self.user, amount=99.99, status="paid"
        )
        self.url = reverse('payment-list')

    def test_list_payments(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
    
    def test_create_payment(self):
        data = {
            "subscription": self.subscription.id,
            "user": self.user.id,
            "amount": 49.99,
            "status": "pending"
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["amount"], "49.99")
