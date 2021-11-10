from os import stat
from django.db.models import indexes
from django.http import response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.fields import DateField
from rest_framework.parsers import JSONParser
from django.http.response import HttpResponse, JsonResponse
from .models import Floors,Rooms,Machines,Profiles,Devices, WorkingHoursMachines
from .serializers import FloorSerializer, ProfileSerializer,RoomSerializer,MachineSerializer,DeviceSerializer
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime,date,timedelta
import csv
from django.db.models import Exists, OuterRef

import pandas as pd

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

@csrf_exempt
def factory(request):
    if request.method == 'GET':
        machines = Machines.objects.all()
        profiles = Profiles.objects.all()
        for machine in machines:
            machine.status=False
            machine.save()
        for profile in profiles:
            profile.status = False
            profile.save()    
        return JsonResponse('success',safe=False)
    if request.method == 'POST':
        machines = Machines.objects.all()
        profiles = Profiles.objects.all()
        for machine in machines:
            machine.status=True
            machine.save()
        for profile in profiles:
            profile.status = True
            profile.save() 
        return JsonResponse('success',safe=False)    

def floorToggle(request,id):
    if request.method == 'GET':
        Machines.objects.filter(floor = Floors.objects.get(FloorId = id)).update(status = False)
        return JsonResponse('success',safe=False)
    if request.method == 'POST':
        Machines.objects.filter(floor = Floors.objects.get(FloorId = id)).update(status = True)
        return JsonResponse('success',safe=False)    

def roomToggle(request,id):
    if request.method == 'GET':
        Machines.objects.filter(room = Rooms.objects.get(RoomId = id)).update(status = False)
        return JsonResponse('success',safe=False) 
    if request.method == 'POST':
        Machines.objects.filter(room = Rooms.objects.get(RoomId = id)).update(status = True)
        return JsonResponse('success',safe=False)        

@csrf_exempt
def data(request):
    if request.method=='POST':
        data=JSONParser().parse(request)['data']
        machineids = []
        print(data)
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
                machineids.append(data[x])
                modelMachine=Machines(room=Rooms.objects.get(RoomId='Floor'+floorId+'RoomName'+roomId),floor=Floors.objects.get(FloorId=floorId),MachineId=MachineAssignDeviceArray[0]+'Machine'+machineId,MachineName=data[x],MachineType=machineType)
                modelMachine.save()
            elif 'FloorName' in x:
                print(x)
                floorId=x.split('FloorName')[1]
                model=Floors(FloorName=data[x],FloorId=floorId)
                model.save()
            else:
                print("In else "+x)
        print(machineids)  
        data = pd.read_csv(BASE_DIR/'machines.csv')
        count_row = data.shape[0]
        for x in range(count_row):
            data.loc[x,'ASSIGNED'] = False
        for x in range(count_row):
            if data.loc[x,'MACHINE_ID'] in machineids:
                data.loc[x,'ASSIGNED'] = True   
        data.to_csv(BASE_DIR/'machines.csv',index=False)           
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
        finalData=  AllData()
        return JsonResponse(finalData,safe=False)

@csrf_exempt
def FloorSchedule(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)['data']
        floors = data['selectedFloors']
        selectedMachines = []
        for floorid in floors:
            floor = Floors.objects.get(FloorId = floorid)
            machines = Machines.objects.filter(floor=floor)
            m_serialized = MachineSerializer(machines,many=True)
            selectedMachines  = selectedMachines + m_serialized.data
        data['selectedMachines'] = selectedMachines
        profile = Profiles(type=1,data=data)
        profile.save()
        return JsonResponse(data,safe=False)

@csrf_exempt    
def RoomSchedule(request):
    if request.method == 'POST':
        data =JSONParser().parse(request)['data']
        rooms = data['selectedRooms']
        selectedMachines = []
        for roomid in rooms:
            room = Rooms.objects.get(RoomId = roomid)
            machines = Machines.objects.filter(room=room)
            m_serialized = MachineSerializer(machines,many=True)
            selectedMachines  = selectedMachines + m_serialized.data
        data['selectedMachines'] = selectedMachines
        profile = Profiles(type=2,data=data)
        profile.save()
        return JsonResponse(data,safe=False)

@csrf_exempt
def MachineSchedule(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)['data']
        machines = data['selectedMachines']
        machineObjects = []
        for machineid in machines:
            machine = Machines.objects.filter(MachineId=machineid)
            m_serialized = MachineSerializer(machine,many=True)
            machineObjects = machineObjects + m_serialized.data
        data['machineObjects'] = machineObjects
        profile = Profiles(type=3,data=data)
        profile.save()
        return JsonResponse(data,safe=False)

def MachineToggle(request,id):
    nowTime=datetime.now().strftime('%H:%M')
    time=datetime.strptime(str(nowTime),'%H:%M')
    machine = Machines.objects.get(MachineId = id)

    
    if machine.status == True:
        machine.status=False
        machine.endTime=str(time.hour)+':'+str(time.minute)
        appendToCsv(indvData=machine,read=1)
        
    else:
        obj=Profiles.objects.all()
        count=0
        prof=0
        for ob in obj:
            if(ob.status==True):
                count=count+1
                prof=ob
        
        machine.status = True
        machine.startTime=str(time.hour)+':'+str(time.minute)
        if(prof!=0):
            print(prof.data)
            if(prof.type==1 or prof.type==2):
                for var in prof.data['selectedMachines']:
                    if(var['MachineId']==id):
                        print('yes in Floor or Room profile')
                        for timeSchd in prof.data['timeSchedule']:
                            if(timeSchd['start']<=str(time.hour)+':'+str(time.minute) and timeSchd['end']>=str(time.hour)+':'+str(time.minute)):
                                machine.endTime=timeSchd['end']
            elif(prof.type==3):
                for var in prof.data['machineObjects']:
                    if(var['MachineId']==id):
                        print('yes in mac profile')
                        for timeSchd in prof.data['timeSchedule']:
                            if(timeSchd['start']<=str(time.hour)+':'+str(time.minute) and timeSchd['end']>=str(time.hour)+':'+str(time.minute)):
                                machine.endTime=timeSchd['end'] 

                
        
        appendToCsv(indvData=machine)
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
    appendToCsv(from_multiData=1) 
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
        print('@@@@@@@@@@@@@@@@@@@@@@@@@')
        appendToCsv(data=profile,from_multiData=1)
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
                        pass
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
                         pass
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
           floors = data['selectedFloors']
           selectedMachines = []
           for floorid in floors:
                floor = Floors.objects.get(FloorId = floorid)
                machines = Machines.objects.filter(floor=floor)
                m_serialized = MachineSerializer(machines,many=True)
                selectedMachines  = selectedMachines + m_serialized.data
           profile.data['selectedMachines'] = selectedMachines
           profile.data['selectedFloors']= data['selectedFloors']
        if profile.type == 2:
           rooms = data['selectedRooms']
           selectedMachines = []
           for roomid in rooms:
                room = Rooms.objects.get(RoomId = roomid)
                machines = Machines.objects.filter(room=room)
                m_serialized = MachineSerializer(machines,many=True)
                selectedMachines  = selectedMachines + m_serialized.data
           profile.data['selectedMachines'] = selectedMachines
           profile.data["selectedRooms"]= data['selectedRooms'] 
        if profile.type == 3:
            getmachines = data['selectedMachines']
            machineObjects = []
            for machineid in getmachines:
                machine = Machines.objects.filter(MachineId=machineid)
                m_serialized = MachineSerializer(machine,many=True)
                machineObjects = machineObjects + m_serialized.data
            profile.data['machineObjects'] = machineObjects
            profile.data['selectedMachines']= data['selectedMachines']
        profile.save()
        return JsonResponse({'message':'updated'},safe=False)

@csrf_exempt
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
        device = Devices(name=data['name'],powerRating=data['power'],capacity=data['capacity'],costperunit=data['costperunit'])
        device.save()
        return JsonResponse({'message':'created'},safe=False) 
    if request.method=='DELETE':
        Devices.objects.get(deviceId = id).delete()
        return JsonResponse({'message':'Deleted'},safe=False)
    if request.method=='PUT':
        data = JSONParser().parse(request)['data']
        device = Devices.objects.get(deviceId = id)
        device.name = data['name']
        device.powerRating=data['power']
        device.capacity=data['capacity']
        device.costperunit=data['costperunit']
        device.save()
        return JsonResponse({'message':'Updated'},safe=False) 

@csrf_exempt
def UpdateCost(request): 
    if request.method == 'POST':
        data = JSONParser().parse(request)['data']
        devices = Devices.objects.all()
        for device in devices:
            device.costperunit = data['cost']
            device.save()
        return JsonResponse({'message':'Updated'},safe=False)   

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

@csrf_exempt
def readCsv(request,id=0):
    data = pd.read_csv(BASE_DIR/'machines.csv')
    count_row = data.shape[0]
    if request.method == 'GET':    
        return JsonResponse(data.to_json(orient='records'),safe=False)
    if request.method == 'POST':
        array = ['PAC001','PAC005','PAC007']
        for x in range(count_row):
            data.loc[x,'ASSIGNED'] = False
        for x in range(count_row):
            if data.loc[x,'MACHINE_ID'] in array:
               data.loc[x,'ASSIGNED'] = True 
        print(data)       
        data.to_csv(BASE_DIR/'machines.csv',index=False)       
        return JsonResponse({'message':"Done"},safe=False)  

def appendToCsv(data=0,indvData=0,from_multiData=0,read=0):

    nowTime=datetime.now().strftime('%H:%M')
    df = pd.read_csv(BASE_DIR/'TO_DATA.csv')
    count_row = df.shape[0]
    if(from_multiData): 
        for x in range(count_row):
            if(str(df.loc[x,'STATUS'])=='ONGOING'):
                tdeltaH=datetime.strptime(str(nowTime),'%H:%M').hour-datetime.strptime(str(df.loc[x,'ON_TIME']),'%H:%M').hour
                tdeltaM=datetime.strptime(str(nowTime),'%H:%M').minute-datetime.strptime(str(df.loc[x,'ON_TIME']),'%H:%M').minute
                df.loc[x,'HRS']=tdeltaH+(tdeltaM/60)
                df.loc[x,'OFF_TIME']=nowTime
                df.loc[x,'STATUS']='DONE'            
            elif(str(df.loc[x,'STATUS'])=='PENDING'):
                df=df.drop(x)
    else:
        print('cccccccc')
        if(indvData!=0 and read==0):
            for rowIndex in range(count_row):
                if(str(df.loc[rowIndex,'STATUS'])=='ONGOING' and str(df.loc[rowIndex,'ID'])==indvData.MachineName):
                    tdeltaH=datetime.strptime(str(nowTime),'%H:%M').hour-datetime.strptime(str(df.loc[rowIndex,'ON_TIME']),'%H:%M').hour
                    tdeltaM=datetime.strptime(str(nowTime),'%H:%M').minute-datetime.strptime(str(df.loc[rowIndex,'ON_TIME']),'%H:%M').minute
                    df.loc[rowIndex,'HRS']=tdeltaH+(tdeltaM/60)
                    print('xxxxxxxxxxxxxxxxxx')
                    df.loc[rowIndex,'STATUS']='DONE'
                    df.loc[rowIndex,'OFF_TIME']=nowTime
                elif(str(df.loc[rowIndex,'STATUS'])=='PENDING' and str(df.loc[rowIndex,'ID'])==indvData.MachineName):
                    pass
                                

        elif(read):
            print(')))))))))))')
            print(indvData)
            listtt=df.loc[( (df['ID'].str.contains(str(indvData))) & (df['STATUS'].str.contains("ONGOING"))),['PROFILE_ID', 'ID', 'ON_TIME', 'OFF_TIME','HRS', 'STATUS']]
            if len(listtt.index.tolist())>0:
                index=listtt.index.tolist()[0]
                df.loc[index,'STATUS']='DONE'
                df.loc[index,'OFF_TIME']=indvData.endTime
                tdeltaH=datetime.strptime(str(indvData.endTime),'%H:%M').hour-datetime.strptime(str(df.loc[index,'ON_TIME']),'%H:%M').hour
                tdeltaM=datetime.strptime(str(indvData.endTime),'%H:%M').minute-datetime.strptime(str(df.loc[index,'ON_TIME']),'%H:%M').minute
                df.loc[index,'HRS']=tdeltaH+(tdeltaM/60)
                print(indvData.endTime)
            
                




    df.to_csv(BASE_DIR/'TO_DATA.csv',index=False)

    # append to csv
    f = open(BASE_DIR/'TO_DATA.csv', 'a',encoding='UTF8', newline='')
    writer = csv.writer(f)
    if(data):
        if(data.type!=3):
            for x in data.data['selectedMachines']:
                for y in data.data['timeSchedule']:
                    if(datetime.strptime(y['end'], '%H:%M')>=datetime.strptime(str(nowTime),'%H:%M')):

                        if(datetime.strptime(y['start'], '%H:%M')<=datetime.strptime(str(nowTime),'%H:%M')):
                            status='ONGOING'
                            strt=str(datetime.strptime(str(nowTime),'%H:%M').hour)+':'+str(datetime.strptime(str(nowTime),'%H:%M').minute)
                        else:
                            status='PENDING'
                            strt=y['start']
                        print(data.data)
                        writer.writerow([data.id,x['MachineName'],strt,y['end'],0,status])
                    else:
                        #Already Done Before Selection
                        pass       
        else:
            for x in data.data['machineObjects']:
                for y in data.data['timeSchedule']:
                    if(datetime.strptime(y['end'], '%H:%M')>=datetime.strptime(str(nowTime),'%H:%M')):

                        if(datetime.strptime(y['start'], '%H:%M')<=datetime.strptime(str(nowTime),'%H:%M')):
                            status='ONGOING'
                            strt=str(datetime.strptime(str(nowTime),'%H:%M').hour)+':'+str(datetime.strptime(str(nowTime),'%H:%M').minute)
                        else:
                            status='PENDING'
                            strt=y['start']
                        print(data.data)
                        writer.writerow([data.id,x['MachineName'],strt,y['end'],0,status])
                    else:
                        #Already Done Before Selection
                        pass 

    elif(indvData and read==0):
        print(indvData.endTime)
        if(datetime.strptime(indvData.endTime, '%H:%M')>=datetime.strptime(str(nowTime),'%H:%M') or str(datetime.strptime(indvData.endTime, '%H:%M').hour)+':'+str(datetime.strptime(indvData.endTime, '%H:%M').minute)=='0:0'):
            if(datetime.strptime(indvData.startTime, '%H:%M')<=datetime.strptime(str(nowTime),'%H:%M')):
                status='ONGOING'
                strt=str(datetime.strptime(str(nowTime),'%H:%M').hour)+':'+str(datetime.strptime(str(nowTime),'%H:%M').minute)
            else:
                status='PENDING'
                strt=indvData.startTime
            writer.writerow(['-1',indvData.MachineName,strt,indvData.endTime,0,status])
        else:
            #Already Done Before Selection
            pass 

    f.close()
    return True

def working_hours_machine(request):
    for m in Machines.objects.all():
        w=timedelta(seconds=0,minutes=0,hours=0)
        df=pd.read_csv(BASE_DIR/'FROM_DATA.csv')
        df['ON_TIME']=pd.to_timedelta(df['ON_TIME']+':00')
        df['OFF_TIME']=pd.to_timedelta(df['OFF_TIME']+':00')
        a=df.loc[df['ID']==m.MachineName].reset_index(drop=True)
        for i in range(0,a.shape[0]):
            if(a.loc[i,'STATUS']=='DONE'):
                t=a.loc[i,'OFF_TIME']-a.loc[i,'ON_TIME']
            else:
                t=pd.to_timedelta(str(datetime.now().strftime('%H:%M:%S')))-a.loc[i,'ON_TIME']

            w=w+t
        whm=WorkingHoursMachines.objects.filter(Date_Field=date.today(),Machine_Name=m)
        print(whm)
        if whm.exists():
            print('###############')

            whm.update(WH_Machine=w)
        else:
            x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(w),Date_Field=date.today())
            print('_______________________')
            print(w)
            print('_______________________')
            x.save()
    return HttpResponse('printed and saved')




