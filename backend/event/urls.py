from django.urls import path
from . import views

app_name = "event"

urlpatterns = [
    ## clubs
    # public
    path("clubs", view=views.club_list, name="api_clubs"),
    path("clubs/<int:id>", view=views.club_detail, name="api_club_detail"),
    # private
    path("clubs/<int:id>/subscribe", view=views.subscribe, name="api_club_subscribe"),
    path("my-clubs", view=views.ClubsView.as_view(), name="api_user_clubs"),
    ## events
    # public
    path("events", view=views.event_list, name="api_events"),
    path("events/<int:id>", view=views.event_detail, name="api_event_detail"),
    # private
    path(
        "events/<int:id>/participate",
        view=views.participate,
        name="api_event_participate",
    ),
    path(
        "my-clubs/<int:club_id>/events",
        view=views.EventsView.as_view(),
        name="api_user_events",
    ),
    path(
        "my-events/<int:id>",
        view=views.EventDetailView.as_view(),
        name="api_user_event_detail",
    ),
    # Profile
    path("profile", view=views.ProfileView.as_view(), name="api_profile"),
]
