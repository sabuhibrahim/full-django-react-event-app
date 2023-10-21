# from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Club, Event
from base_auth.models import User


class QuerySerializer(serializers.Serializer):
    query = serializers.CharField(required=False, allow_blank=True, allow_null=True)


class EventQuerySerializer(QuerySerializer):
    club_id = serializers.IntegerField(required=False, allow_null=True)


class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "full_name",
        )


class ClubCreateSerializer(serializers.Serializer):
    title = serializers.CharField(required=True, allow_blank=False)
    description = serializers.CharField(allow_blank=True)
    image = serializers.ImageField(allow_empty_file=False)


class ClubListSerializer(serializers.ModelSerializer):
    owner = OwnerSerializer()

    class Meta:
        model = Club
        fields = (
            "id",
            "title",
            "description",
            "owner",
            "image",
            "created_at",
            "updated_at",
        )


class EventListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"


class EventCreateSerializer(serializers.Serializer):
    title = serializers.CharField(required=True, allow_blank=False)
    description = serializers.CharField(allow_blank=True)
    image = serializers.ImageField(allow_empty_file=False)
    start_time = serializers.DateTimeField(required=False)
    end_time = serializers.DateTimeField(required=False)


class ClubSerializer(ClubListSerializer):
    subscribe = serializers.SerializerMethodField()

    class Meta(ClubListSerializer.Meta):
        fields = ClubListSerializer.Meta.fields + ("subscribe",)

    def get_subscribe(self, obj: Club) -> str | None:
        user: User = self.context.get("user")
        if user and not user.is_anonymous:
            if obj in user.subscriptions.all():
                return "unsubscribe"
            return "subscribe"
        return None


class EventSerializer(EventListSerializer):
    participate = serializers.SerializerMethodField()

    class Meta(EventListSerializer.Meta):
        fields = (
            "__all__",
            "participate",
        )

    def get_participate(self, obj: Event) -> str | None:
        user: User = self.context.get("user")
        if user and not user.is_anonymous:
            if obj in user.participations.all():
                return "unparticipate"
            return "participate"
        return None
