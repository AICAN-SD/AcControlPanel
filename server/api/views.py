import calendar
from codecs import register
from os import stat
from django.db.models import indexes
from django.db.models.expressions import Exists
from django.http import response
from django.views.decorators.csrf import csrf_exempt
from numpy import floor, power
from rest_framework.fields import DateField
from rest_framework.parsers import JSONParser
from django.http.response import HttpResponse, JsonResponse
from .models import (Floors, PowerConsMachines,Rooms,Machines,Profiles,Devices, 
                   WorkingHoursMachines ,CostPowerConsMachines, WorkingHoursRooms,
                   PowerUsedArrayWeekFloors,PowerUsedArrayMonthFloors,PowerUsedArrayYearFloors)
from .serializers import FloorSerializer, ProfileSerializer,RoomSerializer,MachineSerializer,DeviceSerializer
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime,date,timedelta
import csv
import pandas as pd
from pathlib import Path
import json
from calendar import monthrange

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
        for x in data:
            if 'RoomName' in x:
                
                roomArray=x.split('RoomName')
                floorId=roomArray[0].split('Floor')[1]
                roomId=roomArray[1]
                modelRoom=Rooms(RoomId=x,floor=Floors.objects.get(FloorId=floorId),RoomName=data[x])
                modelRoom.save()
            elif 'MachineAssignDevice' in x:
                MachineAssignDeviceArray=x.split('MachineAssignDevice')
                machineId=MachineAssignDeviceArray[1]
                roomArray=MachineAssignDeviceArray[0].split('Room')
                floorId=roomArray[0].split('Floor')[1]
                roomId=roomArray[1]
                machineType=data['Floor'+floorId+'Room'+roomId+'MachineType'+machineId]
                machineids.append(data[x])
                modelMachine=Machines(room=Rooms.objects.get(RoomId='Floor'+floorId+'RoomName'+roomId),floor=Floors.objects.get(FloorId=floorId),MachineId=MachineAssignDeviceArray[0]+'Machine'+machineId,MachineName=data[x],MachineType=machineType)
                modelMachine.save()
            elif 'FloorName' in x:
                floorId=x.split('FloorName')[1]
                model=Floors(FloorName=data[x],FloorId=floorId)
                model.save()
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
    finalData={}
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

def days_cur_month():
    m = datetime.now().month
    y = datetime.now().year
    ndays = (date(y, m+1, 1) - date(y, m, 1)).days
    d1 = date(y, m, 1)
    d2 = date(y, m, ndays)
    delta = d2 - d1

    return [(d1 + timedelta(days=i)).strftime('%d') for i in range(delta.days + 1)]

def dashboard(request):
    addedWeek=[0,0,0,0,0,0,0]
    addedYear=[0,0,0,0,0,0,0,0,0,0,0,0]
    totalCostYear=[]
    totalCostMonth=[]
    totalCostWeek=[]
    addedMonth=[]
    addedMonthLabel=[]
    lineChartDataWeek=[]
    lineChartDataMonth=[]
    lineChartDataYear=[]
    addedYearLabel=[]
    totalPowerYear=0
    totalPowerMonth=0
    totalPowerWeek=0
    totalPowerYearCost=0
    totalPowerMonthCost=0
    totalPowerWeekCost=0
    today=date.today()
    todayWeekDay=today.weekday()

    weekRoomPower=[]
    weekRoomPowerCost=[]

    weekMacPower=[]
    weekMacPowerCost=[]

    

    monthRoomPower=[]
    monthRoomPowerCost=[]

    
    monthMacPower=[]
    monthMacPowerCost=[]

    yearRoomPower=[]
    yearRoomPowerCost=[]

    yearMacPower=[]
    yearMacPowerCost=[]

    maxPowerWeekRoom=[]
    maxPowerMonthRoom=[]
    maxPowerYearRoom=[]
    maxPowerConsYear=[]
    maxPowerConsMonth=[]
    maxPowerConsWeek=[]

    incInCostWeek=0
    incInCostMonth=0
    incInCostYear=0
    

    monthDays=monthrange(date.today().year, date.today().month)[1]

    startWeekDate=today-timedelta(days=todayWeekDay)
    lastWeekDate= today-timedelta(days=today.weekday(), weeks=1)


    startMonthDate=today-timedelta(days=today.day-1)
    prevMonthLastDate = date.today().replace(day=1) - timedelta(days=1)
    prevMonthFirstDate = prevMonthLastDate.replace(day=1)
    startYearDate=date(year=today.year,month=1,day=1)
    prevYearDate=date(year=today.year-1,month=1,day=1)
    week=PowerUsedArrayWeekFloors.objects.filter(startWeekDate=startWeekDate)
    print(startWeekDate)
    print(lastWeekDate)
    prevWeek=PowerUsedArrayWeekFloors.objects.filter(startWeekDate=lastWeekDate)

    month=PowerUsedArrayMonthFloors.objects.filter(startMonthDate=startMonthDate)
    prevMonth=PowerUsedArrayMonthFloors.objects.filter(startMonthDate=prevMonthFirstDate)
    year=PowerUsedArrayYearFloors.objects.filter(startYearDate=startYearDate)
    prevYear=PowerUsedArrayYearFloors.objects.filter(startYearDate=prevYearDate)
    
    
    if prevWeek.exists():
        totalCostWeek.append(float(prevWeek[0].totalPowerCostFacWeek))
    else:
        totalCostWeek.append(0)

    if week.exists():
        weekJson=week[0].jsonData
        totalPowerWeek=round(float(week[0].totalPowerUsedFacWeek),2)
        totalPowerWeekCost=round(float(week[0].totalPowerCostFacWeek),2)
        lineChartDataWeek=week[0].jsonDataCost

        weekRoomPower=week[0].jsonDataPowerRooms
        weekRoomPowerCost=week[0].jsonDataCostPowerRooms
        maxPowerConsWeek=week[0].maxPowerCons
        weekMacPower=week[0].jsonDataPowerMacs
        weekMacPowerCost=week[0].jsonDataCostPowerMacs

        totalCostWeek.append(float(week[0].totalPowerCostFacWeek))

        sortedDic=sorted(week[0].jsonDataPowerRooms, key=week[0].jsonDataPowerRooms.get, reverse=True)
        for x in range(0,4):
            if x<len(sortedDic):
                ff={}
                ff['roomName']=sortedDic[x]
                ff['value']=weekRoomPower[sortedDic[x]]
                maxPowerWeekRoom.append(ff)
            

        
    else:
        totalCostWeek.append(0)
        weekJson=[]
    

    if prevMonth.exists():
       totalCostMonth.append(float(prevMonth[0].totalPowerCostFacMonth))

    else:
        totalCostMonth.append(0)
    
    if month.exists():
        monthJson=month[0].jsonData
        totalPowerMonth=round(float(month[0].totalPowerUsedFacMonth),2)
        totalPowerMonthCost=round(float(month[0].totalPowerCostFacMonth),2)
        lineChartDataMonth=month[0].jsonDataCost
        totalCostMonth.append(float(month[0].totalPowerCostFacMonth))
        monthRoomPower=month[0].jsonDataPowerRooms
        monthRoomPowerCost=month[0].jsonDataCostPowerRooms
        monthMacPower=month[0].jsonDataPowerMacs
        monthMacPowerCost=month[0].jsonDataCostPowerMacs
        maxPowerConsMonth=month[0].maxPowerCons
        sortedDic=sorted(month[0].jsonDataPowerRooms, key=week[0].jsonDataPowerRooms.get, reverse=True)
        for x in range(0,4):
            if x<len(sortedDic):
                ff={}
                ff['roomName']=sortedDic[x]
                ff['value']=monthRoomPower[sortedDic[x]]
                maxPowerMonthRoom.append(ff)
    else:
        monthJson=[]
        totalCostMonth.append(0)
     
    if prevYear.exists():
       totalCostYear.append(float(prevYear[0].totalPowerCostFacYear))
    else:
        totalCostYear.append(0)

    if year.exists():
        yearJson=year[0].jsonData
        totalPowerYear=round(float(year[0].totalPowerUsedFacYear),2)
        totalPowerYearCost=round(float(year[0].totalPowerCostFacYear),2)
        lineChartDataYear=year[0].jsonDataCost
        yearRoomPower=year[0].jsonDataPowerRooms
        yearRoomPowerCost=year[0].jsonDataCostPowerRooms
        yearMacPower=year[0].jsonDataPowerMacs
        yearMacPowerCost=year[0].jsonDataCostPowerMacs
        maxPowerConsYear=year[0].maxPowerCons
        sortedDic=sorted(year[0].jsonDataPowerRooms, key=year[0].jsonDataPowerRooms.get, reverse=True)
        for x in range(0,4):
            if x<len(sortedDic):
                ff={}
                ff['roomName']=sortedDic[x]
                ff['value']=yearRoomPower[sortedDic[x]]
                maxPowerYearRoom.append(ff)


        totalCostYear.append(float(year[0].totalPowerCostFacYear))
    else:
        yearJson=[]
        totalCostYear.append(0)

    if(totalCostWeek[0]!=0 and totalCostMonth[0]!=0 and totalCostYear[0]!=0):
        
        incInCostWeek=round(float(100*(totalCostWeek[1] - totalCostWeek[0])/totalCostWeek[0]),2)
        incInCostMonth=round(float(100*(totalCostMonth[1] - totalCostMonth[0])/totalCostMonth[0]),2)
        incInCostYear=round(float(100*(totalCostYear[1] - totalCostYear[0])/totalCostYear[0]),2)


    for length in range(0,monthDays):
        addedMonth.append(0)

    for x in weekJson:
        print(weekJson)
        print(len(weekJson[x]))
        if len(weekJson[x]) < 7:
            for l in range (0,7-len(weekJson[x])):
                weekJson[x].append(0)
        for l in range (0,len(weekJson[x])):
                addedWeek[l]=addedWeek[l]+float(weekJson[x][l])
    if len(lineChartDataWeek)<7:
        for x in range(0,7-len(lineChartDataWeek)):
            lineChartDataWeek.append(0)

    if len(lineChartDataMonth)<monthDays:
        for x in range(0,monthDays-len(lineChartDataMonth)):
            lineChartDataMonth.append(0)


        
    for x in monthJson:
        if len(monthJson[x]) < monthDays:
            for l in range (0,monthDays-len(monthJson[x])):
                monthJson[x].append(0)
        for l in range (0,len(monthJson[x])):
                addedMonth[l]=addedMonth[l]+float(monthJson[x][l])
    for x in yearJson:
        for l in range (0,len(yearJson[x])):
                addedYear[l]=addedYear[l]+float(yearJson[x][l])

    print('}}}}}}}}}}')
    print(maxPowerWeekRoom)
    print(maxPowerConsYear)
    print('}}}}}}}}}}')

    addedMonthLabel.append(prevMonthFirstDate.strftime("%b"))
    addedMonthLabel.append(startMonthDate.strftime("%b"))


    

    addedYearLabel.append(prevYearDate.year)
    addedYearLabel.append(startYearDate.year)

    
    

    
    
 
    
    
    

    

    
        
            
   

    
    return JsonResponse({'weekPowerFloors':weekJson,'monthPowerFloors':monthJson,
    'monthDates':days_cur_month(),'yearPowerFloors':yearJson,'ussageWeek':addedWeek,
    'ussageMonth':addedMonth,'ussageYear':addedYear,'totalCostYear':totalCostYear,
    'totalCostMonth':totalCostMonth,'totalCostWeek':totalCostWeek,'addedMonthLabel':addedMonthLabel,
    'addedYearLabel':addedYearLabel,'totalPowerYear':totalPowerYear,'totalPowerMonth':totalPowerMonth,
    'totalPowerWeek':totalPowerWeek,'totalPowerYearCost':totalPowerYearCost,'totalPowerMonthCost':totalPowerMonthCost,
    'totalPowerWeekCost':totalPowerWeekCost,'lineChartDataWeek':lineChartDataWeek,'lineChartDataMonth':lineChartDataMonth,
    'lineChartDataYear':lineChartDataYear,'incInCostWeek':incInCostWeek,'incInCostMonth':incInCostMonth,
    'incInCostYear':incInCostYear,'yearMacPower':yearMacPower,'yearMacPowerCost':yearMacPowerCost,
    'monthMacPower':monthMacPower,'monthMacPowerCost':monthMacPowerCost,
    'weekMacPower':weekMacPower,'weekMacPowerCost':weekMacPowerCost,
    'yearRoomPower':yearRoomPower,'yearRoomPowerCost':yearRoomPowerCost,
    'monthRoomPower':monthRoomPower,'monthRoomPowerCost':monthRoomPowerCost,
    'weekRoomPower':weekRoomPower,'weekRoomPowerCost':weekRoomPowerCost,'maxPowerWeekRoom':maxPowerWeekRoom,
    'maxPowerMonthRoom':maxPowerMonthRoom,'maxPowerYearRoom':maxPowerYearRoom,'maxPowerConsWeek':maxPowerConsWeek,
    'maxPowerConsMonth':maxPowerConsMonth,'maxPowerConsYear':maxPowerConsYear},safe=False) 

def working_hours_machine(request):
    
    
    for m in Machines.objects.all():
        device=Devices.objects.filter(name=m.MachineType)[0]
        w=timedelta(seconds=0,minutes=0,hours=0)
        df=pd.read_csv(BASE_DIR/'FROM_DATA.csv')
        a=df.loc[df['ID']==m.MachineName].reset_index(drop=True)
        maxPowerRating=round(float((device.powerRating*86400)/(1000*3600)),2)
        print(maxPowerRating)
        if a.shape[0]!=0:
            for i in range(0,a.shape[0]):
                

                onTime=datetime.strptime(str(a.loc[i,'ON_TIME']),'%d-%m-%Y %H:%M')
                if not 'prevTime' in locals():
                    prevTime=date(onTime.year,onTime.month,onTime.day)
                elif(prevTime != date(onTime.year,onTime.month,onTime.day)):
                    whm=WorkingHoursMachines.objects.filter(Date_Field=DATE_FIELD,Machine_Name=m)
                    pcm=PowerConsMachines.objects.filter(Date_Field=DATE_FIELD,Machine_Name=m)
                    costpcm=CostPowerConsMachines.objects.filter(Date_Field=DATE_FIELD,Machine_Name=m)
                    powerRating="%.2f"% round((device.powerRating)*(w.total_seconds())/(1000*3600),2)
                    costPowerRating="%.2f"% round(float(powerRating)*(float(str(device.costperunit))),2)
                    if whm.exists() and pcm.exists() and costpcm.exists():
                        costpcm.update(CostPC_Machine=str(costPowerRating))
                        pcm.update(PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating))
                        whm.update(WH_Machine=w)
                    elif(whm.exists() and pcm.exists()==False and costpcm.exists()==False):
                        whm.update(WH_Machine=w)
                        y=PowerConsMachines(Machine_Name=m,Max_PC_Machine=maxPowerRating,CostPC_Machine=str(costPowerRating),PC_Machine=str(powerRating),Date_Field=DATE_FIELD)
                        z=CostPowerConsMachines(Machine_Name=m,CostPC_Machine=str(costPowerRating),Date_Field=DATE_FIELD)
                        y.save()
                        z.save()
                    elif(whm.exists()==False and pcm.exists() and costpcm.exists()==False):
                        x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(w),Date_Field=DATE_FIELD)
                        z=CostPowerConsMachines(Machine_Name=m,CostPC_Machine=str(costPowerRating),Date_Field=DATE_FIELD)
                        x.save()
                        pcm.update(PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating))
                        z.save()
                    elif(whm.exists()==False and pcm.exists()==False and costpcm.exists()):
                        x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(w),Date_Field=DATE_FIELD)
                        y=PowerConsMachines(Machine_Name=m,Max_PC_Machine=maxPowerRating,PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating),Date_Field=DATE_FIELD)
                        x.save()
                        y.save()     
                        whm.update(WH_Machine=w)  
                    elif(whm.exists() and pcm.exists() and costpcm.exists()==False):
                        costpcm.update(CostPC_Machine=str(costPowerRating))
                        pcm.update(PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating))
                        z=CostPowerConsMachines(Machine_Name=m,CostPC_Machine=str(costPowerRating),Date_Field=DATE_FIELD)
                        z.save()

                    elif(whm.exists()==False and pcm.exists() and costpcm.exists()):
                        pcm.update(PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating))
                        whm.update(WH_Machine=w)
                        x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(w),Date_Field=DATE_FIELD)
                        x.save()

                    elif(whm.exists() and pcm.exists()==False and costpcm.exists()):
                        y=PowerConsMachines(Machine_Name=m,Max_PC_Machine=maxPowerRating,PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating),Date_Field=DATE_FIELD)
                        y.save()
                        costpcm.update(CostPC_Machine=str(costPowerRating))
                        whm.update(WH_Machine=w)
                    else:
                        x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(w),Date_Field=DATE_FIELD)
                        y=PowerConsMachines(Machine_Name=m,Max_PC_Machine=maxPowerRating,PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating),Date_Field=DATE_FIELD)
                        z=CostPowerConsMachines(Machine_Name=m,CostPC_Machine=str(costPowerRating),Date_Field=DATE_FIELD)
                        x.save()
                        y.save()
                        z.save()
                    w=timedelta(seconds=0,minutes=0,hours=0)
                nowTime=datetime.now().strftime('%d-%m-%Y %H:%M')
                nowTime=datetime.strptime(str(nowTime),'%d-%m-%Y %H:%M')
                
                if(a.loc[i,'STATUS']=='DONE'):

                    offTime=datetime.strptime(str(a.loc[i,'OFF_TIME']),'%d-%m-%Y %H:%M')
                    d0 = date(offTime.year,offTime.month,offTime.day)
                    d1 = date(onTime.year, onTime.month, onTime.day)
                    delta = d0 - d1

                    DATE_FIELD=(date(offTime.year,offTime.month,offTime.day))

                    if delta.days==0:
                        t=(offTime)-(onTime)
                        DATE_FIELD=(date(offTime.year,offTime.month,offTime.day))
                    elif(delta.days>0):
                        t=timedelta(seconds=0,minutes=0,hours=0)
                        for numberDay in range(0,delta.days+1):
                            if numberDay==0:

                                DATE=date(onTime.year, onTime.month, onTime.day)+timedelta(days=numberDay)
                                DATE_FIELD=DATE
                                

                                todayTime=datetime.strptime(str(onTime.day)+':'+str(onTime.month)+':'+str(onTime.year)+' '+'23:59:59','%d:%m:%Y %H:%M:%S')-onTime
                               
                                whm=WorkingHoursMachines.objects.filter(Date_Field=DATE,Machine_Name=m)
                                pcm=PowerConsMachines.objects.filter(Date_Field=DATE,Machine_Name=m)
                                costpcm=CostPowerConsMachines.objects.filter(Date_Field=DATE,Machine_Name=m)
                                powerRating=("%.2f"% round((device.powerRating)*(todayTime.total_seconds())/(1000*3600),2))
                                costPowerRating=("%.2f"% round(float(powerRating)*(float(str(device.costperunit))),2))
                                if whm.exists() and pcm.exists() and costpcm.exists():
                                    costpcm.update(CostPC_Machine=str(costPowerRating))
                                    pcm.update(PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating))
                                    whm.update(WH_Machine=todayTime)
                                elif(whm.exists() and pcm.exists()==False and costpcm.exists()==False):
                                    whm.update(WH_Machine=todayTime)
                                    y=PowerConsMachines(Machine_Name=m,Max_PC_Machine=maxPowerRating,CostPC_Machine=str(costPowerRating),PC_Machine=str(powerRating),Date_Field=DATE)
                                    z=CostPowerConsMachines(Machine_Name=m,CostPC_Machine=str(costPowerRating),Date_Field=DATE)
                                    y.save()
                                    z.save()
                                elif(whm.exists()==False and pcm.exists() and costpcm.exists()==False):
                                    x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(todayTime),Date_Field=DATE)
                                    z=CostPowerConsMachines(Machine_Name=m,CostPC_Machine=str(costPowerRating),Date_Field=DATE)
                                    x.save()
                                    pcm.update(PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating))
                                    z.save()
                                elif(whm.exists()==False and pcm.exists()==False and costpcm.exists()):
                                    x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(todayTime),Date_Field=DATE)
                                    y=PowerConsMachines(Machine_Name=m,Max_PC_Machine=maxPowerRating,CostPC_Machine=str(costPowerRating),PC_Machine=str(powerRating),Date_Field=DATE)
                                    x.save()
                                    y.save()     
                                    whm.update(WH_Machine=todayTime)  
                                elif(whm.exists() and pcm.exists() and costpcm.exists()==False):
                                    costpcm.update(CostPC_Machine=str(costPowerRating))
                                    pcm.update(PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating))
                                    z=CostPowerConsMachines(Machine_Name=m,CostPC_Machine=str(costPowerRating),Date_Field=DATE)
                                    z.save()

                                elif(whm.exists()==False and pcm.exists() and costpcm.exists()):
                                    pcm.update(PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating))
                                    whm.update(WH_Machine=todayTime)
                                    x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(todayTime),Date_Field=DATE)
                                    x.save()

                                elif(whm.exists() and pcm.exists()==False and costpcm.exists()):
                                    y=PowerConsMachines(Machine_Name=m,Max_PC_Machine=maxPowerRating,CostPC_Machine=str(costPowerRating),PC_Machine=str(powerRating),Date_Field=DATE)
                                    y.save()
                                    costpcm.update(CostPC_Machine=str(costPowerRating))
                                    whm.update(WH_Machine=todayTime)
                                else:
                                    x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(todayTime),Date_Field=DATE)
                                    y=PowerConsMachines(Machine_Name=m,Max_PC_Machine=maxPowerRating,CostPC_Machine=str(costPowerRating),PC_Machine=str(powerRating),Date_Field=DATE)
                                    z=CostPowerConsMachines(Machine_Name=m,CostPC_Machine=str(costPowerRating),Date_Field=DATE)
                                    x.save()
                                    y.save()
                                    z.save()
            
                                
                            elif(numberDay==delta.days):

                                t=datetime.strptime(str(offTime.day)+':'+str(offTime.month)+':'+str(offTime.year)+' '+str(offTime.hour)+':'+str(offTime.minute)+':'+str(offTime.second),'%d:%m:%Y %H:%M:%S')-(datetime.strptime(str(onTime.day)+':'+str(onTime.month)+':'+str(onTime.year)+' '+'00:00:00','%d:%m:%Y %H:%M:%S')+timedelta(days=numberDay))
                                DATE_FIELD=(date(offTime.year,offTime.month,offTime.day))

                            else:

                                oneDay=(datetime.strptime(str(onTime.day)+':'+str(onTime.month)+':'+str(onTime.year)+' '+'23:59:59','%d:%m:%Y %H:%M:%S')+timedelta(days=numberDay))-(datetime.strptime(str(onTime.day)+':'+str(onTime.month)+':'+str(onTime.year)+' '+'00:00:00','%d:%m:%Y %H:%M:%S')+timedelta(days=numberDay))
                                DATE=date(onTime.year, onTime.month, onTime.day)+timedelta(days=numberDay)
                               

                                whm=WorkingHoursMachines.objects.filter(Date_Field=DATE,Machine_Name=m)
                                pcm=PowerConsMachines.objects.filter(Date_Field=DATE,Machine_Name=m)
                                costpcm=CostPowerConsMachines.objects.filter(Date_Field=DATE,Machine_Name=m)
                                powerRating=("%.2f"% round((device.powerRating)*(oneDay.total_seconds())/(1000*3600),2))

                                costPowerRating=("%.2f"% round(float(powerRating)*(float(str(device.costperunit))),2))
                                if whm.exists() and pcm.exists() and costpcm.exists():
                                    costpcm.update(CostPC_Machine=str(costPowerRating))
                                    pcm.update(PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating))
                                    whm.update(WH_Machine=oneDay)
                                elif(whm.exists() and pcm.exists()==False and costpcm.exists()==False):
                                    whm.update(WH_Machine=oneDay)
                                    y=PowerConsMachines(Machine_Name=m,Max_PC_Machine=maxPowerRating,CostPC_Machine=str(costPowerRating),PC_Machine=str(powerRating),Date_Field=DATE)
                                    z=CostPowerConsMachines(Machine_Name=m,CostPC_Machine=str(costPowerRating),Date_Field=DATE)
                                    y.save()
                                    z.save()
                                elif(whm.exists()==False and pcm.exists() and costpcm.exists()==False):
                                    x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(oneDay),Date_Field=DATE)
                                    z=CostPowerConsMachines(Machine_Name=m,CostPC_Machine=str(costPowerRating),Date_Field=DATE)
                                    x.save()
                                    pcm.update(PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating))
                                    z.save()
                                elif(whm.exists()==False and pcm.exists()==False and costpcm.exists()):
                                    x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(oneDay),Date_Field=DATE)
                                    y=PowerConsMachines(Machine_Name=m,Max_PC_Machine=maxPowerRating,CostPC_Machine=str(costPowerRating),PC_Machine=str(powerRating),Date_Field=DATE)
                                    x.save()
                                    y.save()     
                                    whm.update(WH_Machine=oneDay)  
                                elif(whm.exists() and pcm.exists() and costpcm.exists()==False):
                                    costpcm.update(CostPC_Machine=str(costPowerRating))
                                    pcm.update(PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating))
                                    z=CostPowerConsMachines(Machine_Name=m,CostPC_Machine=str(costPowerRating),Date_Field=DATE)
                                    z.save()

                                elif(whm.exists()==False and pcm.exists() and costpcm.exists()):
                                    pcm.update(PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating))
                                    whm.update(WH_Machine=oneDay)
                                    x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(oneDay),Date_Field=DATE)
                                    x.save()

                                elif(whm.exists() and pcm.exists()==False and costpcm.exists()):
                                    y=PowerConsMachines(Machine_Name=m,Max_PC_Machine=maxPowerRating,CostPC_Machine=str(costPowerRating),PC_Machine=str(powerRating),Date_Field=DATE)
                                    y.save()
                                    costpcm.update(CostPC_Machine=str(costPowerRating))
                                    whm.update(WH_Machine=oneDay)
                                else:
                                    x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(oneDay),Date_Field=DATE)
                                    y=PowerConsMachines(Machine_Name=m,Max_PC_Machine=maxPowerRating,CostPC_Machine=str(costPowerRating),PC_Machine=str(powerRating),Date_Field=DATE)
                                    z=CostPowerConsMachines(Machine_Name=m,CostPC_Machine=str(costPowerRating),Date_Field=DATE)
                                    x.save()
                                    y.save()
                                    z.save()
                else:
                    d0 = date(onTime.year, onTime.month, onTime.day)
                    d1 = date(datetime.now().year, datetime.now().month, datetime.now().day)
                    DATE_FIELD=(date(datetime.now().year,datetime.now().month,datetime.now().day))

                    delta = d1 - d0
                    if delta.days==0:
                        t=nowTime-(onTime)
                        DATE_FIELD=date.today()
                    elif(delta.days>0):
                        t=timedelta(seconds=0,minutes=0,hours=0)
                        for numberDay in range(0,delta.days+1):
                            if numberDay==0:
                                DATE_FIELD=date(onTime.year, onTime.month, onTime.day)

                                DATE=date(onTime.year, onTime.month, onTime.day)+timedelta(days=numberDay)
                               
                                todayTime=datetime.strptime(str(onTime.day)+':'+str(onTime.month)+':'+str(onTime.year)+' '+'23:59:59','%d:%m:%Y %H:%M:%S')+timedelta(days=numberDay)-onTime
                                whm=WorkingHoursMachines.objects.filter(Date_Field=DATE,Machine_Name=m)
                                pcm=PowerConsMachines.objects.filter(Date_Field=DATE,Machine_Name=m)
                                costpcm=CostPowerConsMachines.objects.filter(Date_Field=DATE,Machine_Name=m)
                                powerRating=("%.2f"% round((device.powerRating)*(todayTime.total_seconds())/(1000*3600),2))
                               
                                costPowerRating=("%.2f"% round(float(powerRating)*(float(str(device.costperunit))),2))
                                if whm.exists() and pcm.exists() and costpcm.exists():
                                    costpcm.update(CostPC_Machine=str(costPowerRating))
                                    pcm.update(PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating))
                                    whm.update(WH_Machine=todayTime)
                                elif(whm.exists() and pcm.exists()==False and costpcm.exists()==False):
                                    whm.update(WH_Machine=todayTime)
                                    y=PowerConsMachines(Machine_Name=m,Max_PC_Machine=maxPowerRating,CostPC_Machine=str(costPowerRating),PC_Machine=str(powerRating),Date_Field=DATE)
                                    z=CostPowerConsMachines(Machine_Name=m,CostPC_Machine=str(costPowerRating),Date_Field=DATE)
                                    y.save()
                                    z.save()
                                elif(whm.exists()==False and pcm.exists() and costpcm.exists()==False):
                                    x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(todayTime),Date_Field=DATE)
                                    z=CostPowerConsMachines(Machine_Name=m,CostPC_Machine=str(costPowerRating),Date_Field=DATE)
                                    x.save()
                                    pcm.update(PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating))
                                    z.save()
                                elif(whm.exists()==False and pcm.exists()==False and costpcm.exists()):
                                    x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(todayTime),Date_Field=DATE)
                                    y=PowerConsMachines(Machine_Name=m,Max_PC_Machine=maxPowerRating,CostPC_Machine=str(costPowerRating),PC_Machine=str(powerRating),Date_Field=DATE)
                                    x.save()
                                    y.save()     
                                    whm.update(WH_Machine=todayTime)  
                                elif(whm.exists() and pcm.exists() and costpcm.exists()==False):
                                    costpcm.update(CostPC_Machine=str(costPowerRating))
                                    pcm.update(PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating))
                                    z=CostPowerConsMachines(Machine_Name=m,CostPC_Machine=str(costPowerRating),Date_Field=DATE)
                                    z.save()

                                elif(whm.exists()==False and pcm.exists() and costpcm.exists()):
                                    pcm.update(PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating))
                                    whm.update(WH_Machine=todayTime)
                                    x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(todayTime),Date_Field=DATE)
                                    x.save()

                                elif(whm.exists() and pcm.exists()==False and costpcm.exists()):
                                    y=PowerConsMachines(Machine_Name=m,Max_PC_Machine=maxPowerRating,CostPC_Machine=str(costPowerRating),PC_Machine=str(powerRating),Date_Field=DATE)
                                    y.save()
                                    costpcm.update(CostPC_Machine=str(costPowerRating))
                                    whm.update(WH_Machine=todayTime)
                                else:
                                    x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(todayTime),Date_Field=DATE)
                                    y=PowerConsMachines(Machine_Name=m,Max_PC_Machine=maxPowerRating,CostPC_Machine=str(costPowerRating),PC_Machine=str(powerRating),Date_Field=DATE)
                                    z=CostPowerConsMachines(Machine_Name=m,CostPC_Machine=str(costPowerRating),Date_Field=DATE)
                                    x.save()
                                    y.save()
                                    z.save()
            
                                
                            elif(numberDay==delta.days):
                                t=datetime.strptime(str(nowTime.day)+':'+str(nowTime.month)+':'+str(nowTime.year)+' '+str(nowTime.hour)+':'+str(nowTime.minute)+':'+str(nowTime.second),'%d:%m:%Y %H:%M:%S')-(datetime.strptime(str(onTime.day)+':'+str(onTime.month)+':'+str(onTime.year)+' '+'00:00:00','%d:%m:%Y %H:%M:%S')+timedelta(days=numberDay))
                                DATE_FIELD=date.today()
                            else:

                                oneDay=(datetime.strptime(str(onTime.day)+':'+str(onTime.month)+':'+str(onTime.year)+' '+'23:59:59','%d:%m:%Y %H:%M:%S')+timedelta(days=numberDay))-(datetime.strptime(str(onTime.day)+':'+str(onTime.month)+':'+str(onTime.year)+' '+'00:00:00','%d:%m:%Y %H:%M:%S')+timedelta(days=numberDay))
                                DATE=date(onTime.year, onTime.month, onTime.day)+timedelta(days=numberDay)

                                whm=WorkingHoursMachines.objects.filter(Date_Field=DATE,Machine_Name=m)
                                pcm=PowerConsMachines.objects.filter(Date_Field=DATE,Machine_Name=m)
                                costpcm=CostPowerConsMachines.objects.filter(Date_Field=DATE,Machine_Name=m)
                                powerRating=("%.2f"% round((device.powerRating)*(oneDay.total_seconds())/(1000*3600),2))
                                costPowerRating=("%.2f"% round(float(powerRating)*(float(str(device.costperunit))),2))

                                if whm.exists() and pcm.exists() and costpcm.exists():
                                    costpcm.update(CostPC_Machine=str(costPowerRating))
                                    pcm.update(PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating))
                                    whm.update(WH_Machine=oneDay)
                                elif(whm.exists() and pcm.exists()==False and costpcm.exists()==False):
                                    whm.update(WH_Machine=oneDay)
                                    y=PowerConsMachines(Machine_Name=m,Max_PC_Machine=maxPowerRating,CostPC_Machine=str(costPowerRating),PC_Machine=str(powerRating),Date_Field=DATE)
                                    z=CostPowerConsMachines(Machine_Name=m,CostPC_Machine=str(costPowerRating),Date_Field=DATE)
                                    y.save()
                                    z.save()
                                elif(whm.exists()==False and pcm.exists() and costpcm.exists()==False):
                                    x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(oneDay),Date_Field=DATE)
                                    z=CostPowerConsMachines(Machine_Name=m,CostPC_Machine=str(costPowerRating),Date_Field=DATE)
                                    x.save()
                                    pcm.update(PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating))
                                    z.save()
                                elif(whm.exists()==False and pcm.exists()==False and costpcm.exists()):
                                    x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(oneDay),Date_Field=DATE)
                                    y=PowerConsMachines(Machine_Name=m,Max_PC_Machine=maxPowerRating,CostPC_Machine=str(costPowerRating),PC_Machine=str(powerRating),Date_Field=DATE)
                                    x.save()
                                    y.save()     
                                    whm.update(WH_Machine=oneDay)  
                                elif(whm.exists() and pcm.exists() and costpcm.exists()==False):
                                    costpcm.update(CostPC_Machine=str(costPowerRating))
                                    pcm.update(PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating))
                                    z=CostPowerConsMachines(Machine_Name=m,CostPC_Machine=str(costPowerRating),Date_Field=DATE)
                                    z.save()

                                elif(whm.exists()==False and pcm.exists() and costpcm.exists()):
                                    pcm.update(PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating))
                                    whm.update(WH_Machine=oneDay)
                                    x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(oneDay),Date_Field=DATE)
                                    x.save()

                                elif(whm.exists() and pcm.exists()==False and costpcm.exists()):
                                    y=PowerConsMachines(Machine_Name=m,Max_PC_Machine=maxPowerRating,CostPC_Machine=str(costPowerRating),PC_Machine=str(powerRating),Date_Field=DATE)
                                    y.save()
                                    costpcm.update(CostPC_Machine=str(costPowerRating))
                                    whm.update(WH_Machine=oneDay)
                                else:
                                    x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(oneDay),Date_Field=DATE)
                                    y=PowerConsMachines(Machine_Name=m,Max_PC_Machine=maxPowerRating,CostPC_Machine=str(costPowerRating),PC_Machine=str(powerRating),Date_Field=DATE)
                                    z=CostPowerConsMachines(Machine_Name=m,CostPC_Machine=str(costPowerRating),Date_Field=DATE)
                                    x.save()
                                    y.save()
                                    z.save()
            
                                
                w=w+t
            whm=WorkingHoursMachines.objects.filter(Date_Field=DATE_FIELD,Machine_Name=m)
            pcm=PowerConsMachines.objects.filter(Date_Field=DATE_FIELD,Machine_Name=m)
            costpcm=CostPowerConsMachines.objects.filter(Date_Field=DATE_FIELD,Machine_Name=m)
            powerRating=("%.2f"% round((device.powerRating)*(w.total_seconds())/(1000*3600),2))
            costPowerRating=("%.2f"% round(float(powerRating)*(float(str(device.costperunit))),2))

            if whm.exists() and pcm.exists() and costpcm.exists():
                costpcm.update(CostPC_Machine=str(costPowerRating))
                pcm.update(PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating))
                whm.update(WH_Machine=w)
            elif(whm.exists() and pcm.exists()==False and costpcm.exists()==False):
                whm.update(WH_Machine=w)
                y=PowerConsMachines(Machine_Name=m,Max_PC_Machine=maxPowerRating,CostPC_Machine=str(costPowerRating),PC_Machine=str(powerRating),Date_Field=DATE_FIELD)
                z=CostPowerConsMachines(Machine_Name=m,CostPC_Machine=str(costPowerRating),Date_Field=DATE_FIELD)
                y.save()
                z.save()
            elif(whm.exists()==False and pcm.exists() and costpcm.exists()==False):
                x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(w),Date_Field=DATE_FIELD)
                z=CostPowerConsMachines(Machine_Name=m,CostPC_Machine=str(costPowerRating),Date_Field=DATE_FIELD)
                x.save()
                pcm.update(PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating))
                z.save()
            elif(whm.exists()==False and pcm.exists()==False and costpcm.exists()):
                x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(w),Date_Field=DATE_FIELD)
                y=PowerConsMachines(Machine_Name=m,Max_PC_Machine=maxPowerRating,CostPC_Machine=str(costPowerRating),PC_Machine=str(powerRating),Date_Field=DATE_FIELD)
                x.save()
                y.save()     
                whm.update(WH_Machine=w)  
            elif(whm.exists() and pcm.exists() and costpcm.exists()==False):
                costpcm.update(CostPC_Machine=str(costPowerRating))
                pcm.update(PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating))
                z=CostPowerConsMachines(Machine_Name=m,CostPC_Machine=str(costPowerRating),Date_Field=DATE_FIELD)
                z.save()

            elif(whm.exists()==False and pcm.exists() and costpcm.exists()):
                pcm.update(PC_Machine=str(powerRating),CostPC_Machine=str(costPowerRating))
                whm.update(WH_Machine=w)
                x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(w),Date_Field=DATE_FIELD)
                x.save()

            elif(whm.exists() and pcm.exists()==False and costpcm.exists()):
                y=PowerConsMachines(Machine_Name=m,Max_PC_Machine=maxPowerRating,CostPC_Machine=str(costPowerRating),PC_Machine=str(powerRating),Date_Field=DATE_FIELD)
                y.save()
                costpcm.update(CostPC_Machine=str(costPowerRating))
                whm.update(WH_Machine=w)
            else:
                x=WorkingHoursMachines(Machine_Name=m,WH_Machine=str(w),Date_Field=DATE_FIELD)
                y=PowerConsMachines(Machine_Name=m,Max_PC_Machine=maxPowerRating,CostPC_Machine=str(costPowerRating),PC_Machine=str(powerRating),Date_Field=DATE_FIELD)
                z=CostPowerConsMachines(Machine_Name=m,CostPC_Machine=str(costPowerRating),Date_Field=DATE_FIELD)
                x.save()
                y.save()
                z.save()
    
    calculateWeek()
    calculateMonth()
    calculateYear()
    return HttpResponse('printed and saved')

def calculateWeek():
    today = date.today()
    todayWeekDay=today.weekday()
    dateField = today - timedelta(days=todayWeekDay)
    

    a={}
    b={}
    c={}
    d=[]

    # for roomCalculations
    e={}
    f={}
    # for macCalculations
    g={}
    h={}
    #for maxPowerCalculation(red orange green boxes)
    i={}
    totalPowerWeekFAC=0
    totalPowerCostWeekFAC=0

    for mac in Machines.objects.all():
        a[mac.floor.FloorName]=0
        c[mac.floor.FloorName]=0
        b[mac.floor.FloorName]=[]
        e[mac.room.RoomName]=0
        f[mac.room.RoomName]=0
        g[mac.MachineName]=0
        h[mac.MachineName]=0
        i[mac.room.RoomName]=0

    for mac in Machines.objects.all():
        macObj=PowerConsMachines.objects.filter(Machine_Name=mac,Date_Field=date.today())
        if macObj.exists():
            i[mac.room.RoomName]=round(float(i[mac.room.RoomName]+7*float(macObj[0].Max_PC_Machine)),2)
    powerWeek=PowerUsedArrayWeekFloors.objects.filter(startWeekDate=dateField)


    for x in PowerConsMachines.objects.filter(Date_Field=today):
        name=str(x.Machine_Name.floor.FloorName)
        nameRoom=str(x.Machine_Name.room.RoomName)
        nameMac=str(x.Machine_Name)

        

        if powerWeek.exists():
            print('in exists')
            zf=powerWeek[0].jsonData[name]
            print(zf)
            if(len(zf)>todayWeekDay):


                zf[todayWeekDay]=float(zf[todayWeekDay])+float(x.PC_Machine)
            elif(len(zf)<=todayWeekDay):
                if(len(zf)!=todayWeekDay):
                    for leng in range(len(zf),todayWeekDay):
                        zf.append(0)
                if(len(zf)==todayWeekDay):
                    zf.append(float(x.PC_Machine))
            print(zf)
            a[name]=zf
            c[name]=powerWeek[0].totalPowerWeek[name]+round(float(x.PC_Machine),2)
            e[nameRoom]=round(float(float(powerWeek[0].jsonDataPowerRooms[nameRoom])+round(float(x.PC_Machine),2)),2)
            f[nameRoom]=round(float(float(powerWeek[0].jsonDataCostPowerRooms[nameRoom])+round(float(x.CostPC_Machine),2)),2)
            g[nameMac]=round(float(float(powerWeek[0].jsonDataPowerMacs[nameMac])+round(float(x.PC_Machine),2)),2)
            h[nameMac]=round(float(float(powerWeek[0].jsonDataCostPowerMacs[nameMac])+round(float(x.CostPC_Machine),2)),2)
            totalPowerWeekFAC=float(powerWeek[0].totalPowerUsedFacWeek)+round(float(x.PC_Machine),2)
            totalPowerCostWeekFAC=float(powerWeek[0].totalPowerCostFacWeek)+round(float(x.CostPC_Machine),2)
        else:
            a[name]=a[name]+float(x.PC_Machine)
            c[name]=c[name]+round(float(x.PC_Machine),2)

            e[nameRoom]=round(float(e[nameRoom]+round(float(x.PC_Machine),2)),2)
        
            f[nameRoom]=round(float(f[nameRoom]+round(float(x.CostPC_Machine),2)),2)
            g[nameMac]=round(float(g[nameMac]+round(float(x.PC_Machine),2)),2)
            h[nameMac]=round(float(h[nameMac]+round(float(x.CostPC_Machine),2)),2)

            totalPowerWeekFAC=totalPowerWeekFAC+round(float(x.PC_Machine),2)
            totalPowerCostWeekFAC=totalPowerCostWeekFAC+round(float(x.CostPC_Machine),2)

    for floor in Floors.objects.all():
        if not powerWeek.exists():
            b[floor.FloorName].append(a[floor.FloorName])
            a[floor.FloorName]=0
        else:
            if(a[floor.FloorName]!=0):
                b[floor.FloorName]= a[floor.FloorName]
            else:
                b[floor.FloorName]=[]

    if powerWeek.exists():
        if(len(powerWeek[0].jsonDataCost)>=todayWeekDay+1):
            powerWeek[0].jsonDataCost[todayWeekDay]=powerWeek[0].jsonDataCost[todayWeekDay]+float(totalPowerCostWeekFAC)
        else:
            powerWeek[0].jsonDataCost.append(float(totalPowerCostWeekFAC))
        d=powerWeek[0].jsonDataCost
    else:
        d.append(totalPowerCostWeekFAC)

    s1=json.dumps(b)
    s2=json.dumps(c)
    s3=json.dumps(d)

    s4=json.dumps(e)
    s5=json.dumps(f)
    s6=json.dumps(g)
    s7=json.dumps(h)

    s8=json.dumps(i)
    f=PowerUsedArrayWeekFloors.objects.filter(startWeekDate=dateField)
    if f.exists():
        f.update(jsonData=json.loads(s1),maxPowerCons=json.loads(s8),jsonDataCost=json.loads(s3),jsonDataPowerRooms=json.loads(s4),jsonDataCostPowerRooms=json.loads(s5),jsonDataPowerMacs=json.loads(s6),jsonDataCostPowerMacs=json.loads(s7),totalPowerWeek=json.loads(s2),totalPowerCostFacWeek=totalPowerCostWeekFAC,totalPowerUsedFacWeek=totalPowerWeekFAC)
    else:
        mo=PowerUsedArrayWeekFloors(startWeekDate=dateField,maxPowerCons=json.loads(s8),jsonDataCost=json.loads(s3),jsonDataPowerRooms=json.loads(s4),jsonDataCostPowerRooms=json.loads(s5),jsonDataPowerMacs=json.loads(s6),jsonDataCostPowerMacs=json.loads(s7),totalPowerWeek=json.loads(s2),totalPowerCostFacWeek=totalPowerCostWeekFAC,totalPowerUsedFacWeek=totalPowerWeekFAC,jsonData=json.loads(s1))
        mo.save()


def calculateMonth():
    print('In month calc')
    a={}
    c={}
    b={}
    d=[]
    i={}

    # for roomCalculations
    e={}
    f={}
    # for macCalculations
    g={}
    h={}
    totalPowerMonthFAC=0
    totalPowerCostMonthFAC=0
    today = date(date.today().year,date.today().month,date.today().day)
    todayDay=today.day
    dateField=today-timedelta(days=todayDay-1)
    for mac in Machines.objects.all():
        a[mac.floor.FloorName]=0
        c[mac.floor.FloorName]=0
        b[mac.floor.FloorName]=[]
        e[mac.room.RoomName]=0
        f[mac.room.RoomName]=0
        g[mac.MachineName]=0
        h[mac.MachineName]=0
        i[mac.room.RoomName]=0
    for mac in Machines.objects.all():
        macObj=PowerConsMachines.objects.filter(Machine_Name=mac,Date_Field=date.today())
        if macObj.exists():
            i[mac.room.RoomName]=round(float(i[mac.room.RoomName]+float(monthrange(date.today().year, date.today().month)[1])*float(macObj[0].Max_PC_Machine)),2)
    powerMonth=PowerUsedArrayMonthFloors.objects.filter(startMonthDate=dateField)
    
    
    
    for x in PowerConsMachines.objects.filter(Date_Field=today):
        name=str(x.Machine_Name.floor.FloorName)
        nameRoom=str(x.Machine_Name.room.RoomName)
        nameMac=str(x.Machine_Name)
        if powerMonth.exists():
            # print('in if')
            zf=powerMonth[0].jsonData[name]
            print('----------')
            print(zf)
            if(len(zf)>today.day-1):
                # 
                # print(zf[today.day-1])
                # print(x)
                # print(x.PC_Machine)
                # print(float(zf[today.day-1])+float(x.PC_Machine))


                zf[today.day-1]=float(zf[today.day-1])+float(x.PC_Machine)
                # print(zf)
                # print('----------')
            elif(len(zf)<=today.day-1):
                if(len(zf)!=today.day-1):
                    for leng in range(len(zf),today.day-1):
                        zf.append(0)
                if(len(zf)==today.day-1):
                    zf.append(float(x.PC_Machine))
            print(zf)
            print('----------')
            a[name]=zf
            c[name]=powerMonth[0].totalPowerMonth[name]+round(float(x.PC_Machine),2)
            e[nameRoom]=round(float(float(powerMonth[0].jsonDataPowerRooms[nameRoom])+round(float(x.PC_Machine),2)),2)
            f[nameRoom]=round(float(float(powerMonth[0].jsonDataCostPowerRooms[nameRoom])+round(float(x.CostPC_Machine),2)),2)
            g[nameMac]=round(float(float(powerMonth[0].jsonDataPowerMacs[nameMac])+round(float(x.PC_Machine),2)),2)
            h[nameMac]=round(float(float(powerMonth[0].jsonDataCostPowerMacs[nameMac])+round(float(x.CostPC_Machine),2)),2)
            totalPowerMonthFAC=float(powerMonth[0].totalPowerUsedFacMonth)+round(float(x.PC_Machine),2)
            totalPowerCostMonthFAC=float(powerMonth[0].totalPowerCostFacMonth)+round(float(x.CostPC_Machine),2)
        else:

            a[name]=round(float(a[name]+float(x.PC_Machine)),2)
            c[name]=round(float(c[name]+round(float(x.PC_Machine),2)),2)

            e[nameRoom]=round(float(e[nameRoom]+round(float(x.PC_Machine),2)),2)
            f[nameRoom]=round(float(f[nameRoom]+round(float(x.CostPC_Machine),2)),2)
            g[nameMac]=round(float(g[nameMac]+round(float(x.PC_Machine),2)),2)
            h[nameMac]=round(float(h[nameMac]+round(float(x.CostPC_Machine),2)),2)

            totalPowerMonthFAC=round(float(totalPowerMonthFAC+round(float(x.PC_Machine),2)),2)
            totalPowerCostMonthFAC=round(float(totalPowerCostMonthFAC+round(float(x.CostPC_Machine),2)),2)

    for floor in Floors.objects.all():
        if not powerMonth.exists():
            b[floor.FloorName].append(a[floor.FloorName])
            a[floor.FloorName]=0
        else:
            if(a[floor.FloorName]!=0):
                b[floor.FloorName]= a[floor.FloorName]
            else:
                b[floor.FloorName]=[]



    if powerMonth.exists():
        if(len(powerMonth[0].jsonDataCost)>=today.day):
            powerMonth[0].jsonDataCost[today.day-1]=powerMonth[0].jsonDataCost[today.day-1]+float(totalPowerCostMonthFAC)
        else:
            powerMonth[0].jsonDataCost.append(float(totalPowerCostMonthFAC))
        d=powerMonth[0].jsonDataCost
    else:
        d.append(totalPowerCostMonthFAC)
        

    s1=json.dumps(b)
    s2=json.dumps(c)
    s3=json.dumps(d)

    s4=json.dumps(e)
    s5=json.dumps(f)
    s6=json.dumps(g)
    s7=json.dumps(h)
    s8=json.dumps(i)
    f=PowerUsedArrayMonthFloors.objects.filter(startMonthDate=dateField)
    if f.exists():
        f.update(jsonData=json.loads(s1),maxPowerCons=json.loads(s8),jsonDataCost=json.loads(s3),jsonDataPowerRooms=json.loads(s4),jsonDataCostPowerRooms=json.loads(s5),jsonDataPowerMacs=json.loads(s6),jsonDataCostPowerMacs=json.loads(s7),totalPowerUsedFacMonth=totalPowerMonthFAC,totalPowerCostFacMonth=totalPowerCostMonthFAC,totalPowerMonth=json.loads(s2))
    else:
        mo=PowerUsedArrayMonthFloors(startMonthDate=dateField,maxPowerCons=json.loads(s8),jsonDataCost=json.loads(s3),jsonDataPowerRooms=json.loads(s4),jsonDataCostPowerRooms=json.loads(s5),jsonDataPowerMacs=json.loads(s6),jsonDataCostPowerMacs=json.loads(s7),totalPowerCostFacMonth=totalPowerCostMonthFAC,totalPowerUsedFacMonth=totalPowerMonthFAC,totalPowerMonth=json.loads(s2),jsonData=json.loads(s1))
        mo.save()
            

def calculateYear():
    today=date.today()
    powerYear=PowerUsedArrayYearFloors.objects.filter(startYearDate=date(year=date.today().year,month=1,day=1))
    
    
    totalPowerYearFAC=0
    totalPowerCostYearFAC=0
    i={}
    a={}
    b={}
    c={}
    if(powerYear.exists()):
        d=[]
    else:
        d=[0,0,0,0,0,0,0,0,0,0,0,0]

    # for roomCalculations
    e={}
    f={}
    # for macCalculations
    g={}
    h={}
    for mac in Machines.objects.all():
        c[mac.floor.FloorName]=0
        if(powerYear.exists()):
            b[mac.floor.FloorName]=[]
        else:
            b[mac.floor.FloorName]=[0,0,0,0,0,0,0,0,0,0,0,0]
        a[mac.floor.FloorName]=0
        e[mac.room.RoomName]=0
        f[mac.room.RoomName]=0
        g[mac.MachineName]=0
        h[mac.MachineName]=0
        i[mac.room.RoomName]=0
    for mac in Machines.objects.all():
        macObj=PowerConsMachines.objects.filter(Machine_Name=mac,Date_Field=date.today())
        if macObj.exists():
            i[mac.room.RoomName]=round(float(i[mac.room.RoomName]+float((date(date.today().year, 12, 31)-date(date.today().year,1, 1)).days)*float(macObj[0].Max_PC_Machine)),2)
            
    if powerYear.exists():
        for x in PowerConsMachines.objects.filter(Date_Field=today):
            name=str(x.Machine_Name.floor.FloorName)
            nameRoom=str(x.Machine_Name.room.RoomName)
            nameMac=str(x.Machine_Name)
        
            # print('in if')
            zf=powerYear[0].jsonData[name]
            zf[today.month-1]=float(zf[today.month-1])+float(x.PC_Machine)
                
            a[name]=zf
            c[name]=powerYear[0].totalPowerYear[name]+round(float(x.PC_Machine),2)
            e[nameRoom]=round(float(float(powerYear[0].jsonDataPowerRooms[nameRoom])+round(float(x.PC_Machine),2)),2)
            f[nameRoom]=round(float(float(powerYear[0].jsonDataCostPowerRooms[nameRoom])+round(float(x.CostPC_Machine),2)),2)
            g[nameMac]=round(float(float(powerYear[0].jsonDataPowerMacs[nameMac])+round(float(x.PC_Machine),2)),2)
            h[nameMac]=round(float(float(powerYear[0].jsonDataCostPowerMacs[nameMac])+round(float(x.CostPC_Machine),2)),2)
            totalPowerYearFAC=float(powerYear[0].totalPowerUsedFacYear)+round(float(x.PC_Machine),2)
            totalPowerCostYearFAC=float(powerYear[0].totalPowerCostFacYear)+round(float(x.CostPC_Machine),2)
    else:

        
        for x in range (0,date.today().month):
            start_day_of_prev_month=date(year=date.today().year,month=x+1,day=1)
            month=PowerUsedArrayMonthFloors.objects.filter(startMonthDate=start_day_of_prev_month)
            if month.exists():
                for floor in month[0].totalPowerMonth:
                    b[floor][x]=("%.2f"% round(float(month[0].totalPowerMonth[floor]),2))
                    c[floor]=round(float(c[floor]+round(float(month[0].totalPowerMonth[floor]),2)),2)

                for room in month[0].jsonDataPowerRooms:

                    e[room]=round(float(e[room]+round(float(month[0].jsonDataPowerRooms[room]),2)),2)
                    f[room]=round(float(f[room]+round(float(month[0].jsonDataCostPowerRooms[room]),2)),2)
                for mac in month[0].jsonDataPowerMacs:

                    g[mac]=round(float(g[mac]+round(float(month[0].jsonDataPowerMacs[mac]),2)),2)
                    h[mac]=round(float(h[mac]+round(float(month[0].jsonDataCostPowerMacs[mac]),2)),2)

                totalPowerYearFAC=round(float(totalPowerYearFAC+round(float(month[0].totalPowerUsedFacMonth),2)),2)
                totalPowerCostYearFAC=round(float(totalPowerCostYearFAC+round(float(month[0].totalPowerCostFacMonth),2)),2)
                d[x]=totalPowerCostYearFAC
    
    for floor in Floors.objects.all():
        if powerYear.exists():
            # print(a[floor.FloorName])
            if(a[floor.FloorName]!=0):
                b[floor.FloorName]= a[floor.FloorName]
            else:
                b[floor.FloorName]=[]



    if powerYear.exists():
        if(len(powerYear[0].jsonDataCost)>=today.day):
            powerYear[0].jsonDataCost[today.day-1]=powerYear[0].jsonDataCost[today.day-1]+float(totalPowerCostYearFAC)
        else:
            powerYear[0].jsonDataCost.append(float(totalPowerCostYearFAC))
        d=powerYear[0].jsonDataCost

    s1=json.dumps(b)
    s2=json.dumps(c)
    s3=json.dumps(d)

    s4=json.dumps(e)
    s5=json.dumps(f)
    s6=json.dumps(g)
    s7=json.dumps(h)
    s8=json.dumps(i)
    yearArray=PowerUsedArrayYearFloors.objects.filter(startYearDate=date(year=date.today().year,month=1,day=1))
    if yearArray.exists():
        yearArray.update(jsonData=json.loads(s1),maxPowerCons=json.loads(s8),jsonDataCost=json.loads(s3),jsonDataPowerRooms=json.loads(s4),jsonDataCostPowerRooms=json.loads(s5),jsonDataPowerMacs=json.loads(s6),jsonDataCostPowerMacs=json.loads(s7),totalPowerCostFacYear=totalPowerCostYearFAC,totalPowerUsedFacYear=totalPowerYearFAC,totalPowerYear=json.loads(s2))
    else:
        a=PowerUsedArrayYearFloors(jsonData=json.loads(s1),maxPowerCons=json.loads(s8),jsonDataCost=json.loads(s3),jsonDataPowerRooms=json.loads(s4),jsonDataCostPowerRooms=json.loads(s5),jsonDataPowerMacs=json.loads(s6),jsonDataCostPowerMacs=json.loads(s7),totalPowerCostFacYear=totalPowerCostYearFAC,totalPowerUsedFacYear=totalPowerYearFAC,totalPowerYear=json.loads(s2),startYearDate=date(year=date.today().year,month=1,day=1))
        a.save()
        
    print('Saved to db year')



