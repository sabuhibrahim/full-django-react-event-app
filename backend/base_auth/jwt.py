import uuid
from typing import Any
from django.conf import settings
from datetime import timedelta, datetime
from jose import jwt, JWTError
from .models import User, BlackListToken

SUB = "sub"
IAT = "iat"
EXP = "exp"
JTI = "jti"


def _create_access_token(payload: dict[str, Any], minutes: int | None = None) -> str:
    expire = datetime.utcnow() + timedelta(
        minutes=minutes or settings.ACCESS_TOKEN_EXPIRES_MINUTES
    )

    payload[EXP] = expire

    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def _create_refresh_token(payload: dict[str, Any]) -> str:
    expire = datetime.utcnow() + timedelta(
        minutes=settings.REFRESH_TOKEN_EXPIRES_MINUTES
    )
    payload[EXP] = expire

    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def create_token_pair(user: User) -> dict[str, str]:
    payload = {SUB: str(user.id), JTI: str(uuid.uuid4()), IAT: datetime.utcnow()}

    return {
        "access": _create_access_token(payload={**payload}),
        "refresh": _create_refresh_token(payload={**payload}),
    }


def decode_token(token: str) -> dict[str, Any]:
    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    black_list_token = BlackListToken.objects.filter(id=payload[JTI]).first()
    if black_list_token:
        raise JWTError("Token is blacklisted")
    return payload


def mail_token(user: User) -> str:
    """Return 2 hour lifetime access_token"""
    payload = {SUB: str(user.id), JTI: str(uuid.uuid4()), IAT: datetime.utcnow()}
    return _create_access_token(
        payload=payload, minutes=settings.MAIL_TOKEN_EXPIRE_MINUTES
    ).token
