import uuid
from django.db import models
from django.conf import settings

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.core.mail import send_mail

from .manager import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(_("id"), primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField(_("full name"), max_length=150, blank=True)
    email = models.EmailField(_("email"), unique=True)
    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
    )
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)

    objects = UserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def get_full_name(self):
        return self.full_name

    def get_short_name(self):
        """Return the short name for the user."""
        return self.full_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)


def default_expire_time():
    return timezone.now() + timezone.timedelta(
        minutes=settings.REFRESH_TOKEN_EXPIRES_MINUTES
    )


class BlackListToken(models.Model):
    id = models.UUIDField(_("id"), primary_key=True, default=uuid.uuid4, editable=False)
    expire = models.DateTimeField(_("expire"), default=default_expire_time)
    created_at = models.DateTimeField(_("created at"), auto_now_add=True)
