from rest_framework import serializers
from .models import Floors,Rooms,Machines,TimeScheduleFloor,TimeScheduleRoom,TimeScheduleMachine

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

class TimeSFSerializer(serializers.ModelSerializer):
    class Meta:
        model=TimeScheduleFloor
        fields='__all__'            

class TimeSRSerializer(serializers.ModelSerializer):
    class Meta:
        model=TimeScheduleRoom
        fields='__all__'     

class TimeSMSerializer(serializers.ModelSerializer):
    class Meta:
        model=TimeScheduleMachine
        fields='__all__'             