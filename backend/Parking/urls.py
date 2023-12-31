from django.urls import path
from .views import Reserve,Free,ViewParking,Allocate,GenerateReceipt,AddParking,ViewParkingSpace,ViewReservation

urlpatterns = [
    path('add_parking',AddParking.as_view(),name='addParking'),
    path('view_parking',ViewParking.as_view(),name='viewParking'),
    path('view_reservation/<int:pk>',ViewReservation.as_view(),name='viewParking'),
    path('view_parking_space/<str:pk>',ViewParkingSpace.as_view(),name='viewParkingSpace'),    
    path('reserve/<str:pk>',Reserve.as_view(),name='reserve'),
    path('allocate/<int:pk>',Allocate.as_view(),name='allocate'),
    path('free',Free.as_view(),name='free'),
    path('generate',GenerateReceipt.as_view(),name='generate'),
]

