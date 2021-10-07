from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from .models import Floors,Rooms,Machines,TimeScheduleFloor,TimeScheduleRoom,TimeScheduleMachine
from .serializers import FloorSerializer,RoomSerializer,MachineSerializer,TimeSFSerializer,TimeSRSerializer,TimeSMSerializer
from django.core import serializers

# Floors Api
def Floor(request,id=0):
    if request.method =='GET':
        if id:
            floors = Floors.objects.filter(FloorId=id)
            print(floors)
        else:
            floors = Floors.objects.all()
        floors_serializer = FloorSerializer(floors,many=True)
        return JsonResponse(floors_serializer.data,safe=False)#Solve This Error(Shows error for get method response)

# Rooms Api
def Room(request,id=0):
    if request.method == 'GET':
        if id:
            floor= Floors.objects.get(FloorId=id)
            rooms = Rooms.objects.filter(floor=floor)
        else:
            rooms=Rooms.objects.all()    
        rooms_serializer = RoomSerializer(rooms,many=True)
        return JsonResponse(rooms_serializer.data,safe=False)

# Machines api
def Machine(request,id=0):
    if request.method == 'GET':
        if id:
            machines = Machines.objects.filter(room=id)
        else:
            machines = Machines.objects.all()    
        machines_serializer = MachineSerializer(machines,many=True)
        return JsonResponse(machines_serializer.data,safe=False)

# Floor's Time Schedule Api
def TimeSF(request,fid=0,id=0):
    if(request.method) == 'GET':
        if fid:
            floor= Floors.objects.get(FloorId=fid)
            floorS=TimeScheduleFloor.objects.filter(floor=floor)
    
        else:
            print('else')
            floorS=TimeScheduleFloor.objects.filter(id=id)    
        floorS_serializer = TimeSFSerializer(floorS,many=True)    
        return JsonResponse(floorS_serializer.data,safe=False)

# Room's Time Schedule Api
def TimeSR(request,rid=0,id=0):
    if(request.method) == 'GET':
        if id:
            roomS=TimeScheduleRoom.objects.filter(id=id)
        else:
            room = Rooms.objects.get(RoomId=rid)
            roomS=TimeScheduleRoom.objects.filter(room=room)    
        roomS_serializer = TimeSRSerializer(roomS,many=True)    
        return JsonResponse(roomS_serializer.data,safe=False)        

# Machines's Time Schedule Api
def TimeSM(request,mid=0,id=0):
    if(request.method) == 'GET':
        if id:
            machineS=TimeScheduleMachine.objects.filter(id=id)
        else:
            machine = Machines.objects.get(MachineId=mid)
            machineS=TimeScheduleMachine.objects.filter(machine=machine)    
        machineS_serializer = TimeSMSerializer(machineS,many=True)    
        return JsonResponse(machineS_serializer.data,safe=False) 