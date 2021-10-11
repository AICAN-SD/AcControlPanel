from rest_framework import serializers
from .models import Floors, Profiles,Rooms,Machines

class FloorSerializer(serializers.ModelSerializer):
    class Meta:
        model=Floors
        fields='__all__'

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model=Rooms
        fields= '__all__'       

class MachineSerializer(serializers.ModelSerializer):
    class Meta:
        model=Machines
        fields='__all__'   

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=Profiles
        fields='__all__'               
