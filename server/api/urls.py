from django.urls import path
from . import views

urlpatterns = [
   path('api/data',views.data),
   path('api/floors/',views.Floor,name="floor"),#get data for creating floorProfile

   path('api/rooms/',views.Room,name="room"),#get data for creating roomProfile

   path('api/machines/',views.Machine,name="machine"),#get data for creating machineProfile

   path('api/FloorSchedule/',views.FloorSchedule,name="FloorSchedule"),#post data of room profile

   path('api/RoomSchedule/',views.RoomSchedule,name="RoomSchedule"),#post data of room profile
   
   path('api/MachineSchedule/',views.MachineSchedule,name="MachineSchedule"),#post data of machine profile

   path('api/profile/<str:id>',views.ProfileToggle),#make profile active
   path('api/getProf/<str:id>',views.GetProfile),
   path('api/profile/',views.ProfileOff),
   path('api/deleteProf/<str:id>',views.deleteProf),
   path('api/machine/<str:id>',views.MachineToggle),
]