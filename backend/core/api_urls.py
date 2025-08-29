#backend/core/api_urls.py

from django.urls import path, include

urlpatterns = [
    path('auth/', include('users.urls')),
    path('generator/', include('generator.urls')),  # add prefix
]




