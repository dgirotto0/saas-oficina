# saas_oficinas/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('apps.users.urls')),
    path('api/workshops/', include('apps.workshops.urls')),
    path('api/customers/', include('apps.customers.urls')),
    path('api/vehicles/', include('apps.vehicles.urls')),
    path('api/services/', include('apps.services.urls')),
    path('api/products/', include('apps.products.urls')),
    path('api/inventory/', include('apps.inventory.urls')),
    path('api/payments/', include('apps.payments.urls')),
    path('api/notifications/', include('apps.notifications.urls')),
    path('api/subscriptions/', include('apps.subscriptions.urls')),
    path('api/activitylog/', include('apps.activitylog.urls')),  # Opcional
]
