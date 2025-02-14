# apps/subscriptions/serializers.py
from rest_framework import serializers
from .models import Subscription

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ['id', 'user', 'plan', 'trial_start_date', 'trial_end_date', 'subscription_start_date', 'next_billing_date', 'status']
