from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from .models import Floors,Rooms,Machines,Profiles
from .serializers import FloorSerializer, ProfileSerializer,RoomSerializer,MachineSerializer
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
                modelRoom=Rooms(RoomId=x,floor=Floors.objects.get(FloorId=floorId),RoomName=data[x])
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
                modelMachine=Machines(room=Rooms.objects.get(RoomId='Floor'+floorId+'RoomName'+roomId),floor=Floors.objects.get(FloorId=floorId),MachineId=MachineAssignDeviceArray[0]+'Machine'+machineId,MachineName=data[x],MachineType=machineType)
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

# Machines api to get data for control panel
def Machine(request):
    if request.method == 'GET':
        floors=Floors.objects.all()
        profiles = Profiles.objects.all()
        floorProfiles=[]
        roomProfiles=[]
        machineProfiles=[]
        for profile in profiles:
            if profile.type == 1:
                floorProfiles.append(profile) 
            elif profile.type==2:
                roomProfiles.append(profile) 
            else:
                machineProfiles.append(profile)         
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
            floorProfilesS=ProfileSerializer(floorProfiles,many=True)
            roomProfilesS=ProfileSerializer(roomProfiles,many=True)
            machineProfilesS=ProfileSerializer(machineProfiles,many=True)
            finalData={
                "floorProfiles":floorProfilesS.data,
                "roomProfiles":roomProfilesS.data,
                "machineProfiles":machineProfilesS.data,
                "Data":data
            }  
        return JsonResponse(finalData,safe=False)

@csrf_exempt
def FloorSchedule(request):
    if request.method == 'POST':
        
        data = JSONParser().parse(request)['data']
        print(data)
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

@csrf_exempt
def ProfileToggle(request,id):
    if request.method == 'POST':
        machines = Machines.objects.all()
        for machine in machines:
            machine.status=False
            machine.save()
        profiles = Profiles.objects.all()
        for x in profiles:
            x.status=False
            x.save()    
        profile=Profiles.objects.get(id=id)
        profile.status=True
        profile.save()
        if profile.type == 1:
            floors = profile.data['selectedFloors']
            for floorid in floors:
                floor = Floors.objects.get(FloorId=floorid)
                Machines.objects.filter(floor=floor).update(status=True)
        elif profile.type == 2:
            rooms = profile.data['selectedRooms']
            for roomid in rooms:
                room=Rooms.objects.get(RoomId=roomid)
                Machines.objects.filter(room=room).update(status=True)
        elif profile.type == 3:  
             machineids = profile.data['selectedMachines'] 
             for machineid in machineids:
                 machine = Machines.objects.get(MachineId=machineid)
                 machine.status=True
                 machine.save()    
    # get all data
        floors=Floors.objects.all()
        profiles = Profiles.objects.all()
        floorProfiles=[]
        roomProfiles=[]
        machineProfiles=[]
        for profile in profiles:
            if profile.type == 1:
                floorProfiles.append(profile) 
            elif profile.type==2:
                roomProfiles.append(profile) 
            else:
                machineProfiles.append(profile)         
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
            floorProfilesS=ProfileSerializer(floorProfiles,many=True)
            roomProfilesS=ProfileSerializer(roomProfiles,many=True)
            machineProfilesS=ProfileSerializer(machineProfiles,many=True)
            finalData={
                "floorProfiles":floorProfilesS.data,
                "roomProfiles":roomProfilesS.data,
                "machineProfiles":machineProfilesS.data,
                "Data":data
            }  
        return JsonResponse(finalData,safe=False)           