#backend/users/models.py

from django.db import models
from django.contrib.auth.models import User
# Using default User; we store profile flags if needed
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_premium = models.BooleanField(default=False)
