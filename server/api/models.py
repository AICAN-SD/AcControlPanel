from django.db import models


class Floors(models.Model):
    FloorId = models.AutoField(primary_key=True,unique=True)
    FloorName = models.CharField(max_length=200)
    status = models.BooleanField(default=False)

    def __str__(self):
        return self.FloorName

class Rooms(models.Model):
    RoomId = models.AutoField(primary_key=True)
    floor = models.ForeignKey(Floors,on_delete=models.CASCADE)
    RoomName = models.CharField(max_length=200)
    status = models.BooleanField(default=False)
    
    def __str__(self):
        return self.RoomName

class Machines(models.Model):
    MachineId = models.AutoField(primary_key=True)
    room = models.ForeignKey(Rooms, on_delete=models.CASCADE)
    MachineName = models.CharField(max_length=200) 
    status = models.BooleanField(default=False)
    
    def __str__(self):
        return self.MachineName  

class TimeScheduleFloor(models.Model):
    id =  models.AutoField(primary_key=True)
    floor=models.ForeignKey(Floors, on_delete=models.CASCADE)
    startTime = models.TimeField(auto_now=False, auto_now_add=False)
    endTime = models.TimeField(auto_now=False, auto_now_add=False)

    class Meta:
        ordering=['startTime']

class TimeScheduleRoom(models.Model):
    id= models.AutoField(primary_key=True)
    room=models.ForeignKey(Rooms, on_delete=models.CASCADE)
    startTime = models.TimeField(auto_now=False, auto_now_add=False)
    endTime = models.TimeField(auto_now=False, auto_now_add=False)  

    class Meta:
        ordering=['startTime']  

class TimeScheduleMachine(models.Model):
    id= models.AutoField(primary_key=True)
    floor = models.ForeignKey(Floors,on_delete=models.CASCADE)
    machine=models.ForeignKey(Machines, on_delete=models.CASCADE)
    startTime = models.TimeField(auto_now=False, auto_now_add=False)
    endTime = models.TimeField(auto_now=False, auto_now_add=False)    

    class Meta:
        ordering=['startTime']