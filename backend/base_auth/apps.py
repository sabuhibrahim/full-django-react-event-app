from django.apps import AppConfig


class BaseAuthConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'base_auth'
