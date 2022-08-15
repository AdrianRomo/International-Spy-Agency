from rest_framework import serializers

from hits.models import Hit


class HitSerializer(serializers.ModelSerializer):

    hitman_id = serializers.IntegerField(required=False)

    class Meta:
        model = Hit
        fields = [
            'id',
            'target_name',
            'hitman_id',
            'state',
            'description'
        ]