from django.db import models


class Floors(models.Model):
    FloorId = models.AutoField(primary_key=True,unique=True)
    FloorName = models.CharField(max_length=200)
    status = models.BooleanField(default=False)

    def __str__(self):
        return self.FloorName

class Rooms(models.Model):
    RoomId = models.CharField(max_length=200,primary_key=True,unique=True)
    floor = models.ForeignKey(Floors,on_delete=models.CASCADE)
    RoomName = models.CharField(max_length=200)
    status = models.BooleanField(default=False)
    
    def __str__(self):
        return self.RoomName

class Machines(models.Model):
    MachineId = models.CharField(max_length=200,primary_key=True,unique=True)
    room = models.ForeignKey(Rooms, on_delete=models.CASCADE)
    floor = models.ForeignKey(Floors,on_delete=models.CASCADE)
    MachineName = models.CharField(max_length=200) 
    MachineType=models.CharField(max_length=100)
    status = models.BooleanField(default=False)
    startTime=models.CharField(max_length=20,default='00:00')
    endTime=models.CharField(max_length=20,default='00:00')

    def __str__(self):
        return self.MachineName  

class Profiles(models.Model): #1 for floorprofile, 2 for room profile, 3 for machine profile
    id= models.AutoField(primary_key=True,unique=True)
    type = models.IntegerField()
    data = models.JSONField(null=True, blank=True)
    status=models.BooleanField(default=False)
    def __str__(self):
        return str(self.id)  
    def __unicode__(self):
        return "{0} {1} {2} {3} {4}".format(
            self, self.id,self.type, self.data,self.status)

class Devices(models.Model):
     deviceId= models.AutoField(primary_key=True,unique=True)
     name= models.CharField(max_length=200)
     powerRating=models.IntegerField()
     capacity = models.IntegerField()
     costperunit = models.DecimalField(default=6.5,max_digits=3,decimal_places=2)

     def __str__(self):
        return self.name

class WorkingHoursMachines(models.Model):
    id= models.AutoField(primary_key=True,unique=True)
    Machine_Name = models.ForeignKey(Machines,on_delete=models.CASCADE) 
    WH_Machine =models.CharField(max_length=200) 
    Date_Field=models.DateField()

    def __str__(self):
        return str(str(self.Date_Field)+' '+str(self.Machine_Name))
        
class PowerConsMachine(models.Model):
    id= models.AutoField(primary_key=True,unique=True)
    Machine_Name = models.ForeignKey(Machines,on_delete=models.CASCADE) 
    PC_Machine =models.CharField(max_length=200) 
    Date_Field=models.DateField()

    def __str__(self):
        return str(str(self.Date_Field)+' '+str(self.Machine_Name))

class CostPowerConsMachine(models.Model):
    id= models.AutoField(primary_key=True,unique=True)
    Machine_Name = models.ForeignKey(Machines,on_delete=models.CASCADE) 
    CostPC_Machine =models.CharField(max_length=200) 
    Date_Field=models.DateField()

    def __str__(self):
        return str(str(self.Date_Field)+' '+str(self.Machine_Name))

class WorkingHoursRooms(models.Model):
    id= models.AutoField(primary_key=True,unique=True)
    Room_Name = models.ForeignKey(Floors,on_delete=models.CASCADE)
    WH_Room =models.CharField(max_length=200)  
    Date_Field=models.DateField()

    def __str__(self):
        return str(self.Room_Name)

class WorkingHoursFloors(models.Model):
    id= models.AutoField(primary_key=True,unique=True)
    Floor_Name = models.ForeignKey(Rooms,on_delete=models.CASCADE)
    WH_Floor =models.CharField(max_length=200) 
    Date_Field=models.DateField()

    def __str__(self):
        return str(self.Floor_Name)


