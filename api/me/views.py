from django.db.models import Q
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework.generics import GenericAPIView

from hitmen.models import User
from hitmen.serializers import UserSerializer
from hits.models import Hit
from hits.serializers import HitSerializer


class MyProfile(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        user = User.objects.get(email=request.user)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

my_profile = MyProfile.as_view()

class MyHits(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        """
        Get all hits for current user
        """
        hitman_type = request.user.hitman_type
        try:
            hits = {
                'hitman': Hit.objects.all().filter(hitman__email=request.user),
                'manager': Hit.objects.all().filter(Q(hitman__manager=request.user) |
                                                     Q(hitman=request.user)),
                'boss': Hit.objects.all()
            }
            serializer = HitSerializer(hits[hitman_type], many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Hit.DoesNotExist:
            hits = []
        serializer = HitSerializer(hits, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

my_hits_view = MyHits.as_view()

class MyHitmen(GenericAPIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        """
        Get all hitmen for current user
        """
        try:
            hitman_type = request.user.hitman_type
            is_active = self.request.query_params.get('is_active', None)
            if hitman_type == 'hitman':
                return Response([], status=status.HTTP_200_OK)
            users = {
                is_active: {
                    'manager': User.objects.all().filter(
                        manager__email=request.user,
                        is_active=bool(is_active)).exclude(id=request.user.id),
                    'boss': User.objects.all().filter(is_active=bool(is_active)).exclude(id=request.user.id)
                },
                None: {
                    'manager': User.objects.all().filter(manager__email=request.user).exclude(id=request.user.id),
                    'boss': User.objects.all().exclude(id=request.user.id)
                }

            }
            users = users[is_active][hitman_type]
        except User.DoesNotExist:
            users = []
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

my_hitmen_view = MyHitmen.as_view()