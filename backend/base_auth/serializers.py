from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password as val_pass
from django.contrib.auth import authenticate, login as django_login
from django.utils.translation import gettext_lazy as _

from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed

from .models import User
from .jwt import create_token_pair, _create_access_token, JWTError, decode_token


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)

    def login(self) -> dict:
        data = self.validated_data
        data["username"] = data.pop("email")
        user = authenticate(**data)

        if not user:
            raise AuthenticationFailed(detail="Email or password is invalid")

        django_login(self.context.get("request"), user=user)

        return create_token_pair(user=user)


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    full_name = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)

    def validate(self, attrs: dict) -> dict:
        attrs = super().validate(attrs)

        if attrs.get("password") != attrs.get("confirm_password"):
            raise serializers.ValidationError(
                {"password": [_("Password fields didn't match.")]}
            )

        return attrs

    def validate_password(self, val: str) -> str:
        try:
            val_pass(val)
        except ValidationError as e:
            raise serializers.ValidationError(list(e.messages))
        return val

    def validate_email(self, val: str) -> str:
        if User.objects.filter(email=val).exists():
            raise serializers.ValidationError(["Email has already taken"])

        return val

    def save(self, commit=True) -> User:
        data = self.validated_data
        user = User()
        user.email = data.get("email")
        user.full_name = data.get("full_name")
        user.set_password(data.get("password"))

        user.is_active = True
        if commit:
            user.save()

        return user

    def login(self) -> dict:
        user = self.save()
        return create_token_pair(user=user)


class RefreshTokenSerializer(serializers.Serializer):
    token = serializers.CharField(required=True, allow_blank=False)
    payload = None

    def validate_token(self, val: str) -> str:
        try:
            print(val)
            self.payload = decode_token(val)
        except JWTError:
            raise serializers.ValidationError(["Refresh token is invalid"])
        return val

    def access_token(self) -> dict:
        if not self.payload:
            return None

        return {"token": _create_access_token(payload=self.payload)}
