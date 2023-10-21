from django.contrib.auth import logout as django_logout
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from backend.constants import POST
from .serializers import LoginSerializer, RegisterSerializer, RefreshTokenSerializer
from .jwt import JTI, jwt_response
from .models import BlackListToken


@api_view(http_method_names=[POST])
@permission_classes(permission_classes=[AllowAny])
def login(request) -> Response:
    serializer = LoginSerializer(data=request.data, context={"request": request})
    serializer.is_valid(raise_exception=True)

    return jwt_response(serializer.login())


@api_view(http_method_names=[POST])
@permission_classes(permission_classes=[AllowAny])
def register(request) -> Response:
    serializer = RegisterSerializer(data=request.data, context={"request": request})
    serializer.is_valid(raise_exception=True)

    return jwt_response(serializer.login(), status=status.HTTP_201_CREATED)


@api_view(http_method_names=[POST])
@permission_classes(permission_classes=[IsAuthenticated])
def logout(request) -> Response:
    user = request.user
    payload = user.jwt_payload
    BlackListToken.objects.create(id=payload.get(JTI))
    django_logout(request=request)

    return Response(status=status.HTTP_200_OK)


@api_view(http_method_names=[POST])
@permission_classes(permission_classes=[AllowAny])
def refresh(request) -> Response:
    token = request.COOKIES.get("refresh")
    serializer = RefreshTokenSerializer(data={"token": token})
    serializer.is_valid(raise_exception=True)

    return Response(serializer.access_token(), status=status.HTTP_200_OK)
