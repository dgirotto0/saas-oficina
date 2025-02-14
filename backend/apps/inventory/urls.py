# apps/inventory/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InventoryViewSet

router = DefaultRouter()
router.register(r'', InventoryViewSet, basename='inventory')

urlpatterns = [
    path('', include(router.urls)),
]
