# apps/notifications/test_notifications.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.users.models import CustomUser
from .models import Notification
from datetime import datetime, timedelta

class NotificationTests(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_superuser(
            username="dgirotto", email="dgirotto@example.com", password="Girotto20@"
        )
        self.client.force_authenticate(user=self.user)
        self.notification = Notification.objects.create(
            user=self.user,
            type="reminder",
            message="Teste de notificação",
            status="sent",
            scheduled_time=datetime.now() + timedelta(days=1)
        )
        self.url = reverse('notification-list')

    def test_list_notifications(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
    
    def test_create_notification(self):
        data = {
            "user": self.user.id,
            "type": "alert",
            "message": "Nova notificação",
            "status": "pending",
            "scheduled_time": (datetime.now() + timedelta(days=2)).isoformat()
        }
        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["type"], "alert")
