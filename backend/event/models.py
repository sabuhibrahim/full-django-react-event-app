from django.db import models
from django.utils.translation import gettext_lazy as _

from .helpers import get_club_path, get_event_path


class Club(models.Model):
    title = models.CharField(_("title"), max_length=150)
    description = models.TextField(_("description"))
    image = models.ImageField(_("image"), upload_to=get_club_path)

    owner = models.ForeignKey(
        "base_auth.User", verbose_name=_("owner"), on_delete=models.CASCADE
    )

    created_at = models.DateTimeField(_("created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("updated at"), auto_now=True)

    subscribers = models.ManyToManyField(
        "base_auth.User", verbose_name=_("subscribers"), related_name="subscriptions"
    )

    class Meta:
        verbose_name = _("club")
        verbose_name_plural = _("clubs")


class Event(models.Model):
    title = models.CharField(_("title"), max_length=150)
    description = models.TextField(_("description"))
    image = models.ImageField(_("image"), upload_to=get_event_path)

    start_time = models.DateTimeField(_("start time"))
    end_time = models.DateTimeField(_("end time"))

    club = models.ForeignKey(Club, verbose_name=_("club"), on_delete=models.CASCADE)

    created_at = models.DateTimeField(_("created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("updated at"), auto_now=True)

    participaters = models.ManyToManyField(
        "base_auth.User", verbose_name=_("participaters"), related_name="participations"
    )

    class Meta:
        verbose_name = _("event")
        verbose_name_plural = _("events")
