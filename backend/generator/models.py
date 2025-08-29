# backend/generator/models.py


from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import JSONField  # or use models.JSONField in Django 5.1+

User = get_user_model()

class Project(models.Model):
    TYPE_CHOICES = [
        ('proposal', 'Proposal'),
        ('pitch_deck', 'Pitch Deck'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    form_data = models.JSONField()
    ai_content = models.JSONField(null=True, blank=True)      # store generated AI content
    template = models.CharField(max_length=20, default='classic')  # 'classic' or 'modern'
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
