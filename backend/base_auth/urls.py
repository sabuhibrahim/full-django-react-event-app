from django.urls import path

from . import views

app_name = "base_auth"

urlpatterns = [
    path("login", view=views.login, name="api_login"),
    path("register", view=views.register, name="api_register"),
    path("logout", view=views.logout, name="api_logout"),
    path("refresh", view=views.refresh, name="api_refresh"),
]
