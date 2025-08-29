# backend/users/serializers.py

# backend/users/serializers.py

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import Profile


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    # rename fields to override default username requirement
    credential = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        credential = attrs.get("credential")
        password = attrs.get("password")

        # decide whether it's an email or username
        if "@" in credential:
            user_obj = User.objects.filter(email=credential).first()
            username = user_obj.username if user_obj else None
        else:
            username = credential

        if not username:
            raise serializers.ValidationError("Invalid credentials")

        user = authenticate(
            request=self.context.get("request"),
            username=username,
            password=password,
        )

        if user is None or not user.is_active:
            raise serializers.ValidationError(
                "No active account found with the given credentials"
            )

        refresh = RefreshToken.for_user(user)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "username": user.username,
            "email": user.email,
        }

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ("username", "email", "password")

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email"),
            password=validated_data["password"],
        )
        return user