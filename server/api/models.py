from django.db import models


class Floors(models.Model):
    FloorId = models.AutoField(primary_key=True,unique=True)
    FloorName = models.CharField(max_length=200)
    status = models.BooleanField(default=False)

    def __str__(self):
        return self.FloorName

class Rooms(models.Model):
    RoomId = models.AutoField(primary_key=True,unique=True)
    floor = models.ForeignKey(Floors,on_delete=models.CASCADE)
    RoomName = models.CharField(max_length=200)
    status = models.BooleanField(default=False)
    
    def __str__(self):
        return self.RoomName

class Machines(models.Model):
    MachineId = models.AutoField(primary_key=True,unique=True)
    room = models.ForeignKey(Rooms, on_delete=models.CASCADE)
    MachineName = models.CharField(max_length=200) 
    MachineType=models.CharField(max_length=100)
    status = models.BooleanField(default=False)
    
    def __str__(self):
        return self.MachineName  

class Profiles(models.Model): #1 for floorprofile, 2 for room profile, 3 for machine profile
    id= models.AutoField(primary_key=True,unique=True)
    type = models.IntegerField()
    data = models.JSONField()
    status=models.BooleanField(default=False)

