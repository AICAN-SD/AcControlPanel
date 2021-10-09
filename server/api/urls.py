from django.urls import path
from . import views

urlpatterns = [
   path('api/data',views.data),
   path('api/floors/',views.Floor,name="floor"),#get data for creating floorProfile

   path('api/rooms/',views.Room,name="room"),#get data for creating roomProfile

   path('api/machines/',views.Machine,name="machine"),#get data for creating machineProfile

   path('TSF1/<str:fid>/',views.TimeSF),#All Schedule records for a floor
   path('TSF/<str:id>/',views.TimeSF),#specific floor Schedule record

   path('TSR1/<str:rid>/',views.TimeSR),#All Schedule records for a Room
   path('TSR/<str:id>/',views.TimeSR),#specific Room Schedule record

   path('TSM1/<str:mid>',views.TimeSM),#All Schedule records for a Machine
   path('TSM/<str:id>/',views.TimeSM)#specific Machine Schedule record
]