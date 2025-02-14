# apps/workshops/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WorkshopViewSet

router = DefaultRouter()
router.register(r'', WorkshopViewSet, basename='workshop')  # Adicione o basename

urlpatterns = [
    path('', include(router.urls)),
]
