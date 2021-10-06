from django.urls import path
from . import views

urlpatterns = [
   path('floors/',views.Floor,name="floor"),
   path('floors/<str:id>',views.Floor,name="floor"),

   path('rooms/',views.Room,name="room"),
   path('rooms/<str:id>/',views.Room,name="room"),

   path('machines/',views.Machine,name="machine"),
   path('machines/<str:id>/',views.Machine,name="machine"),

   path('TSF/<str:fid>/',views.TimeSF),
   path('TSF/<str:id>/',views.TimeSF),

   path('TSR/',views.TimeSR),
   path('TSR/<str:id>/',views.TimeSR),

   path('TSM/',views.TimeSR),
   path('TSM/<str:id>/',views.TimeSR)
]