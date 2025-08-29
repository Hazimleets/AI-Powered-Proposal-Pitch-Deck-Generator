#backend/users/urls.py

from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, LoginView
from .views import MeView

urlpatterns = [
     path("login/", LoginView.as_view(), name="login"),  # <-- use your LoginView
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", RegisterView.as_view(), name="register"),
    path('me/', MeView.as_view(), name='me')
]
