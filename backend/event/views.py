from django.db.models.query_utils import Q
from rest_framework.generics import ListCreateAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from rest_framework import status

from backend.constants import GET, POST, PUT
from base_auth.models import User
from .models import Club, Event
from . import serializers as s


@api_view(http_method_names=[GET])
@permission_classes(permission_classes=[AllowAny])
def club_list(request) -> Response:
    query = s.QuerySerializer(data=request.GET)
    query.is_valid(raise_exception=True)
    clubs_query = Club.objects.all()

    q = query.validated_data.get("query")
    if q:
        clubs_query = clubs_query.filter(
            Q(title__icontains=q) | Q(description__icontains=q)
        )

    paginator = PageNumberPagination()

    return paginator.get_paginated_response(
        data=s.ClubListSerializer(
            paginator.paginate_queryset(clubs_query, request), many=True
        ).data
    )


@api_view(http_method_names=[GET])
@permission_classes(permission_classes=[AllowAny])
def event_list(request) -> Response:
    query = s.EventQuerySerializer(data=request.data)
    query.is_valid(raise_exception=True)

    events_query = Event.objects.all()

    q = query.validated_data.get("query")
    if q:
        events_query = events_query.filter(
            Q(title__icontains=q) | Q(description__icontains=q)
        )

    club_id = query.validated_data.get("club_id")
    if club_id:
        events_query = events_query.filter(club_id=club_id)

    paginator = PageNumberPagination()

    return paginator.get_paginated_response(
        data=s.EventListSerializer(
            paginator.paginate_queryset(events_query, request), many=True
        ).data
    )


@api_view(http_method_names=[GET])
@permission_classes(permission_classes=[AllowAny])
def club_detail(request, id: int) -> Response:
    club = Club.objects.select_related("owner").filter(id=id).first()
    if not club:
        raise NotFound("Club not found")

    return Response(s.ClubSerializer(club, context={"user": request.user}).data)


@api_view(http_method_names=[POST])
@permission_classes(permission_classes=[IsAuthenticated])
def subscribe(request, id: int) -> Response:
    club = Club.objects.filter(id=id).first()
    if not club:
        raise NotFound("Club not found")

    user: User = request.user
    if club in user.subscriptions.all():
        user.subscriptions.remove(club)
    else:
        user.subscriptions.add(club)

    return Response(status=status.HTTP_200_OK)


@api_view(http_method_names=[GET])
@permission_classes(permission_classes=[AllowAny])
def event_detail(request, id: int) -> Response:
    event = Event.objects.filter(id=id).first()
    if not event:
        raise NotFound("Event not found")
    return Response(s.EventSerializer(event, context={"user": request.user}).data)


@api_view(http_method_names=[POST])
@permission_classes(permission_classes=[IsAuthenticated])
def participate(request, id: int) -> Response:
    event = Event.objects.filter(id=id).first()
    if not event:
        raise NotFound("Event not found")

    user: User = request.user
    if event in user.participations.all():
        user.participations.remove(event)
    else:
        user.participations.add(event)

    return Response(status=status.HTTP_200_OK)


class ClubsView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = s.ClubListSerializer

    def create(self, request, *args, **kwargs) -> Response:
        serializer = s.ClubCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        club = Club(**serializer.validated_data)
        club.owner = request.user
        club.save()
        return Response(
            s.ClubSerializer(club, context={"user": request.user}).data,
            status=status.HTTP_201_CREATED,
        )

    def get_queryset(self):
        return Club.objects.select_related("owner").filter(owner=self.request.user)


class ClubDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    def get_object(self, id: int) -> Club:
        club = (
            Club.objects.select_related("owner")
            .filter(id=id, owner=self.request.user)
            .first()
        )
        if not club:
            raise NotFound("Club not found")

        return club

    def get(self, request, id, *args, **kwargs) -> Response:
        return Response(
            s.ClubSerializer(self.get_object(id), context={"user": request.user}).data
        )

    def put(self, request, id, *args, **kwargs) -> Response:
        club = self.get_object(id)
        serializer = s.ClubCreateSerializer(request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        for key in serializer.validated_data.keys():
            setattr(club, key, serializer.validated_data.get(key))
        club.save()

        return Response(
            s.ClubSerializer(club, context={"user": request.user}).data,
            status=status.HTTP_200_OK,
        )

    def delete(self, request, id, *args, **kwargs) -> Response:
        club = self.get_object(id)
        club.delete()

        return Response(status=status.HTTP_200_OK)


class EventsView(ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = s.EventListSerializer

    def create(self, request, club_id, *args, **kwargs):
        club = Club.objects.filter(id=club_id, owner=request.user).first()
        if not club:
            raise NotFound("Club not found")
        serializer = s.EventCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        event = Event(**serializer.validated_data)
        event.club = club
        event.save()

        return Response(
            s.EventSerializer(event, context={"user": request.user}).data,
            status=status.HTTP_201_CREATED,
        )

    def get_queryset(self):
        club_id = self.kwargs.get("club_id")
        return Event.objects.filter(club__owner=self.request.user, club_id=club_id)


class EventDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    def get_object(self, id: int) -> Event:
        event = Event.objects.filter(id=id, club__owner=self.request.user).first()
        if not event:
            raise NotFound("Event not found")

        return event

    def get(self, request, id, *args, **kwargs) -> Response:
        return Response(
            s.EventSerializer(self.get_object(), context={"user": request.user})
        )

    def put(self, request, id, *args, **kwargs) -> Response:
        event = self.get_object(id)
        serializer = s.EventCreateSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        for key in serializer.validated_data.keys():
            setattr(event, key, serializer.validated_data.get(key))

        event.save()

        return Response(
            s.EventSerializer(self.get_object(), context={"user": request.user})
        )

    def delete(self, request, id, *args, **kwargs) -> Response:
        event = self.get_object(id)
        event.delete()
        return Response(status=status.HTTP_200_OK)


class ProfileView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = s.UserSerializer

    def get(self, request, *args, **kwargs):
        return Response(self.serializer_class(request.user).data)
