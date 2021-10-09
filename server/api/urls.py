from django.urls import path
from . import views

urlpatterns = [
   path('api/data',views.data),
   path('api/floors/',views.Floor,name="floor"),#get data for creating floorProfile

   path('api/rooms/',views.Room,name="room"),#get data for creating roomProfile

   path('api/machines/',views.Machine,name="machine"),#get data for creating machineProfile
]