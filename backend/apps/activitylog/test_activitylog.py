# apps/activitylog/test_activitylog.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.users.models import CustomUser
from .models import ActivityLog

class ActivityLogTests(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_superuser(
            username="dgirotto", email="dgirotto@example.com", password="Girotto20@"
        )
        self.client.force_authenticate(user=self.user)
        self.log = ActivityLog.objects.create(
            user=self.user,
            action="Teste de log",
            details={"info": "detalhes do log"}
        )
        self.url = reverse('activitylog-list')

    def test_list_activity_logs(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
