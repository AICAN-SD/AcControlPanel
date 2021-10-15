from typing import final
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from .models import Floors,Rooms,Machines,Profiles,Devices
from .serializers import FloorSerializer, ProfileSerializer,RoomSerializer,MachineSerializer,DeviceSerializer
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime



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
        finalData=AllData()
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

def MachineToggle(request,id):
    nowTime=datetime.now().strftime('%H:%M')
    time=datetime.strptime(str(nowTime),'%H:%M')
    machine = Machines.objects.get(MachineId = id)
    
    if machine.status == True:
        machine.status=False
        machine.startTime='00:00'
        machine.endTime='00:00'
        
    else:
        machine.status = True
        machine.startTime=str(time.hour)+':'+str(time.minute)
        machine.endTime='00:00'
    machine.save()  
    finalData=AllData()       
    return JsonResponse(finalData,safe=False)

def ProfileOff(request):
    machines = Machines.objects.all()
    for machine in machines:
        machine.status=False
        machine.startTime='00:00'
        machine.endTime='00:00'
        machine.save()
    profiles = Profiles.objects.all()
    for x in profiles:
        x.status=False
        x.save()  
    finalData=AllData()
    return JsonResponse(finalData,safe=False)    

@csrf_exempt
def deleteProf(request,id):
    if request.method == "DELETE":
        Profiles.objects.get(id=id).delete()
        return JsonResponse({"message":"Profile Deleted"},safe=False)       

def ProfileToggle(request,id):
    if request.method == 'GET':
        nowTime=datetime.now().strftime('%H:%M')
        machines = Machines.objects.all()
        for machine in machines:
            machine.status=False
            machine.startTime='00:00'
            machine.endTime='00:00'
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
                
                truth=True
                for var in profile.data['timeSchedule']:
                    startTime=var['start']
                    endTime=var['end']
                    if(truth and datetime.strptime(endTime, '%H:%M')>=datetime.strptime(str(nowTime),'%H:%M') ):
                        truth=False
                        mac=Machines.objects.filter(MachineId__contains='Floor'+floorid)
                        for m in mac:
                            m.startTime=startTime
                            m.endTime=endTime
                            m.save()
                    else:
                        pass
                if(truth):
                    mac=Machines.objects.filter(MachineId__contains='Floor'+floorid)
                    for m in mac:
                        m.startTime='00:00'
                        m.endTime='00:00'
                        m.save()
        elif profile.type == 2:
            rooms = profile.data['selectedRooms']
            for roomid in rooms:
                room=Rooms.objects.get(RoomId=roomid)
                Machines.objects.filter(room=room).update(status=True)
                roomID=roomid.split('RoomName')[1]
                floorID=roomid.split('RoomName')[0].split('Floor')[1] 
                truth=True
                for var in profile.data['timeSchedule']:
                    startTime=var['start']
                    endTime=var['end']
                    if(truth and datetime.strptime(endTime, '%H:%M')>=datetime.strptime(str(nowTime),'%H:%M') ):
                        truth=False
                        mac=Machines.objects.filter(MachineId__contains='Floor'+floorID+'Room'+roomID)
                        for m in mac:
                            m.startTime=startTime
                            m.endTime=endTime
                            m.save()
                    else:
                        print('in else')
                if(truth):
                    mac=Machines.objects.filter(MachineId__contains='Floor'+floorID+'Room'+roomID)
                    for m in mac:
                        m.startTime='00:00'
                        m.endTime='00:00'
                        m.save()
        elif profile.type == 3:  
             machineids = profile.data['selectedMachines'] 
             for machineid in machineids:
                 machine = Machines.objects.get(MachineId=machineid)
                 machine.status=True
                 truth=True
                 for var in profile.data['timeSchedule']:
                     startTime=var['start']
                     endTime=var['end']
                     if(truth and datetime.strptime(endTime, '%H:%M')>=datetime.strptime(str(nowTime),'%H:%M') ):
                         truth=False
                         machine.startTime=startTime
                         machine.endTime=endTime
                         machine.save()
                     else:
                         print('in else')
                 if(truth):
                     machine.startTime='00:00'
                     machine.endTime='00:00'
                     machine.save() 
    # get all data
        finalData=AllData()  
        return JsonResponse(finalData,safe=False)   
def GetProfile(request,id):
    if request.method=='GET':
        profile = Profiles.objects.filter(id=id)
        profile_serializer = ProfileSerializer(profile,many=True)
        return JsonResponse(profile_serializer.data[0],safe=False)        

@csrf_exempt
def EditProfile(request,id):
    if request.method == 'POST':
        data = JSONParser().parse(request)['data']
        profile = Profiles.objects.get(id=id)
        profile.data['profName'] = data['profName']
        profile.data['timeSchedule']= data['timeSchedule']
        if profile.type == 1:
           profile.data['selectedFloors']= data['selectedFloors']
        if profile.type == 2:
           profile.data["selectedRooms"]= data['selectedRooms'] 
        if profile.type == 3:
           profile.data['selectedMachines']= data['selectedMachines']        
        profile.save()
        return JsonResponse({'message':'updated'},safe=False) 

def devices(request,id=0):
    if request.method=='GET':
        if id:
            data = Devices.objects.filter(deviceId = id)
        else:    
            data = Devices.objects.all()
        jsonData = DeviceSerializer(data,many=True)
        return JsonResponse(jsonData.data,safe=False)
    if request.method=='POST':
        data = JSONParser().parse(request)['data']
        device = Devices(name=data.name,powerRating=data.power,capacity=data.capacity,costperunit=data.costperunit)
        device.save()
        return JsonResponse({'message':'created'},safe=False) 
    if request.method=='DELETE':
        Devices.objects.get(deviceId = id).delete()
        return JsonResponse({'message':'Deleted'},safe=False)     

def AllData():
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
    return finalData