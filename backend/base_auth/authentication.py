from rest_framework import authentication, HTTP_HEADER_ENCODING, exceptions
from jose import JWTError
from django.utils.translation import gettext_lazy as _

from .jwt import decode_token, SUB, JTI
from .models import User, BlackListToken


class JWTAuthentication(authentication.BaseAuthentication):
    """
    An authentication plugin that authenticates requests through a JSON web
    token provided in a request header.
    """

    www_authenticate_realm = "api"
    media_type = "application/json"
    keyword = "Bearer"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def authenticate(self, request):
        """
        Returns a `User` if the request session currently has a logged in user.
        Otherwise returns `None`.
        """

        auth_header = authentication.get_authorization_header(request=request)

        if not auth_header:
            return None
        auth_header = auth_header.decode()
        try:
            key, token = auth_header.split()
        except:
            msg = _("Invalid token header. No credentials provided.")
            raise exceptions.AuthenticationFailed(msg)
        if key.lower() != self.keyword.lower():
            msg = _("Invalid token header. No credentials provided.")
            raise exceptions.AuthenticationFailed(msg)

        try:
            payload = decode_token(token)
        except UnicodeError:
            msg = _(
                "Invalid token header. Token string should not contain invalid characters."
            )
            raise exceptions.AuthenticationFailed(msg)
        except JWTError:
            # Expired or Token invalid or Blacklisted
            raise exceptions.AuthenticationFailed("Authentication Failed.")

        user = User.objects.filter(id=payload[SUB]).first()
        # Unauthenticated
        if not user or not user.is_active:
            raise exceptions.AuthenticationFailed("Authentication Failed.")

        if BlackListToken.objects.filter(id=payload[JTI]).exists():
            raise exceptions.AuthenticationFailed("Authentication Failed.")

        user.jwt_payload = payload

        return (user, None)
