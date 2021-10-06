from django.urls import path
from . import views

urlpatterns = [
   path('floors/',views.Floor,name="floor"),
   path('floors/<str:id>/',views.Floor,name="floor"),

   path('rooms/',views.Room,name="room"),
   path('rooms/<str:id>/',views.Room,name="room"),#rooms for specific floor

   path('machines/',views.Machine,name="machine"),
   path('machines/<str:id>/',views.Machine,name="machine"),#machines for specific room

   path('TSF/<str:fid>/',views.TimeSF),#All Schedule records for a floor
   path('TSF/<str:id>/',views.TimeSF),#specific floor Schedule record

   path('TSR/<str:rid>/',views.TimeSR),#All Schedule records for a Room
   path('TSR/<str:id>/',views.TimeSR),#specific Room Schedule record

   path('TSM/<str:mid>',views.TimeSM),#All Schedule records for a Machine
   path('TSM/<str:id>/',views.TimeSM)#specific Machine Schedule record
]