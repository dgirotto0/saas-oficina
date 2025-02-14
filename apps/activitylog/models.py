# apps/activitylog/models.py

from django.db import models
from apps.users.models import CustomUser

class ActivityLog(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='activity_logs')
    action = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    details = models.JSONField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.action} em {self.timestamp}"
