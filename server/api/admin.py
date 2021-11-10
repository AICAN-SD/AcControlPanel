from django.contrib import admin
from .models import Floors,Rooms,Machines,Profiles,Devices, WorkingHoursMachines,WorkingHoursFloors,WorkingHoursRooms

# Register your models here.
admin.site.register(Floors)
admin.site.register(Rooms)
admin.site.register(Machines)
admin.site.register(Profiles)
admin.site.register(WorkingHoursMachines)
