# apps/subscriptions/test_subscriptions.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.users.models import CustomUser
from .models import Subscription

class SubscriptionTests(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_superuser(
            username="dgirotto", email="dgirotto@example.com", password="Girotto20@"
        )
        self.client.force_authenticate(user=self.user)
        self.subscription = Subscription.objects.create(
            user=self.user, plan="free_trial", status="active"
        )
        self.url = reverse('subscription-list')

    def test_list_subscriptions(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
    
    def test_update_subscription(self):
        data = {"plan": "premium"}
        url_detail = reverse('subscription-detail', args=[self.subscription.id])
        response = self.client.patch(url_detail, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["plan"], "premium")
