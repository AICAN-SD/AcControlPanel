from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from .models import Floors,Rooms,Machines,Profiles
from .serializers import FloorSerializer,RoomSerializer,MachineSerializer
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
            datay=[]
            for room in rooms:
                machines=Machines.objects.filter(room=room)
                machines_serializer = MachineSerializer(machines,many=True)
                x={
                    "roomName":room.RoomName,
                    "machines":machines_serializer.data
                }
                datay.append(x)
            datax["rooms"]=datay
            data.append(datax)   
        return JsonResponse(data,safe=False)

@csrf_exempt
def FloorSchedule(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)['data']
        profile = Profiles(type=1,data=data)
        profile.save()
        return JsonResponse(data,safe=False)

@csrf_exempt    
def RoomSchedule(request):
    if request.method == 'POST':
        data =JSONParser().parse(request)['data']
        profile = Profiles(type=2,data=data)
        profile.save()
        return JsonResponse(data,safe=False)

@csrf_exempt
def MachineSchedule(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)['data']
        profile = Profiles(type=3,data=data)
        profile.save()
        return JsonResponse(data,safe=False)