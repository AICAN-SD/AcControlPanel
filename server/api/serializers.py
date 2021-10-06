from rest_framework import serializers
from .models import Floors

class FloorSerializer(serializers.Serializer):
    class Meta:
        model=Floors
        fields=[]