from django.contrib import admin

from . import models as m


class EventInline(admin.TabularInline):
    model = m.Event


@admin.register(m.Club)
class ClubAdmin(admin.ModelAdmin):
    inlines = (EventInline,)


@admin.register(m.Event)
class EventAdmin(admin.ModelAdmin):
    pass
