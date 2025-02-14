# apps/notifications/models.py

from django.db import models
from apps.users.models import CustomUser

class Notification(models.Model):
    STATUS_CHOICES = [
        ('sent', 'Sent'),
        ('pending', 'Pending'),
        ('failed', 'Failed'),
    ]
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='notifications')
    type = models.CharField(max_length=50)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    scheduled_time = models.DateTimeField()

    def __str__(self):
        return f"Notificação para {self.user.username} agendada em {self.scheduled_time}"
