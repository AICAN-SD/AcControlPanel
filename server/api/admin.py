from django.contrib import admin
from .models import Floors,Rooms,Machines,Profiles,Devices, WorkingHoursMachines,WorkingHoursFloors,WorkingHoursRooms,PowerConsMachines,CostPowerConsMachines,PowerUsedArrayWeekFloors,PowerUsedArrayMonthFloors

# Register your models here.
admin.site.register(Floors)
admin.site.register(Rooms)
admin.site.register(Machines)
admin.site.register(Profiles)
admin.site.register(Devices)
admin.site.register(WorkingHoursMachines)
admin.site.register(PowerConsMachines)
admin.site.register(CostPowerConsMachines)
admin.site.register(PowerUsedArrayWeekFloors)
admin.site.register(PowerUsedArrayMonthFloors)
