#backend/generator/serializers.py

from rest_framework import serializers
from .models import Project

class InputSerializer(serializers.Serializer):
    company = serializers.CharField()
    industry = serializers.CharField()
    projectDescription = serializers.CharField()
    targetMarket = serializers.CharField()
    budget = serializers.CharField()
    goals = serializers.CharField()
    competitors = serializers.CharField(required=False, allow_blank=True, default="")
    template = serializers.ChoiceField(choices=[('classic', 'Classic'), ('modern', 'Modern')])

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'type',
            'created_at',
            'updated_at',
            'form_data',
            'ai_content',
            'template',
        ]
