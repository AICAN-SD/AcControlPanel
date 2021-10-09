from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from .models import Floors,Rooms,Machines,TimeScheduleFloor,TimeScheduleRoom,TimeScheduleMachine
from .serializers import FloorSerializer,RoomSerializer,MachineSerializer,TimeSFSerializer,TimeSRSerializer,TimeSMSerializer
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def data(request):
    if request.method=='POST':
        data=JSONParser().parse(request)['data']
        
        for x in data:
            if 'RoomName' in x:
                
                roomArray=x.split('RoomName')
                floorId=roomArray[0].split('Floor')[1]
                roomId=roomArray[1]
                modelRoom=Rooms(RoomId=roomId,floor=Floors.objects.get(FloorId=floorId),RoomName=data[x])
                modelRoom.save()
            elif 'MachineAssignDevice' in x:
                print(x)
                MachineAssignDeviceArray=x.split('MachineAssignDevice')
                machineId=MachineAssignDeviceArray[1]
                roomArray=MachineAssignDeviceArray[0].split('Room')
                floorId=roomArray[0].split('Floor')[1]
                roomId=roomArray[1]
                print('FloorId  '+floorId)
                print('roomId  '+roomId)
                print('machineId  '+machineId)
                machineType=data['Floor'+floorId+'Room'+roomId+'MachineType'+machineId]
                print(machineType)
                modelMachine=Machines(room=Rooms.objects.get(RoomId=roomId),MachineId=machineId,MachineName=data[x],MachineType=machineType)
                modelMachine.save()
            elif 'FloorName' in x:
                print(x)
                floorId=x.split('FloorName')[1]
                model=Floors(FloorName=data[x],FloorId=floorId)
                model.save()
            else:
                print("In else "+x)
        return JsonResponse('success',safe=False)


# Floors Api
def Floor(request):
    if request.method =='GET':
        floors = Floors.objects.all()
        floors_serializer = FloorSerializer(floors,many=True)
        return JsonResponse(floors_serializer.data,safe=False)#Solve This Error(Shows error for get method response)

# Rooms Api
def Room(request):
    if request.method == 'GET':
        floors=Floors.objects.all()
        data=[]
        for x in floors:
            room = Rooms.objects.filter(floor=x)
            rooms_serializer = RoomSerializer(room,many=True)
            datax={
                "floor":x.FloorName,
                "rooms":rooms_serializer.data
            }
            data.append(datax)
        return JsonResponse(data,safe=False)

# Machines api
def Machine(request):
    if request.method == 'GET':
        floors=Floors.objects.all()
        data=[]
        for floor in floors:
            datax={
                    "floor":floor.FloorName,
                  }
            rooms=Rooms.objects.filter(floor=floor)
            rooms_serializer = RoomSerializer(rooms,many=True)
            for room in rooms:
                machines=Machines.objects.filter(room=room)
                machines_serializer = MachineSerializer(machines,many=True)
                datay={
                    "roomName":room.RoomName,
                    "machines":machines_serializer.data
                }
                datax["room"]=datay
            data.append(datax)   
        
        return JsonResponse(data,safe=False)

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