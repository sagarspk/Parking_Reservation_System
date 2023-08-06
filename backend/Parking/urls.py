from django.urls import path
from .views import Reserve,Free,ViewParking,Allocate,GenerateReceipt,AddParking

urlpatterns = [
    path('reserve/<int:pk>',Reserve.as_view(),name='reserve'),
    path('add_parking',AddParking.as_view(),name='addParking'),
    path('free/<int:pk>',Free.as_view(),name='free'),
    path('view',ViewParking.as_view(),name='view'),
    path('allocate/<int:pk>',Allocate.as_view(),name='allocate'),
    path('generate',GenerateReceipt.as_view(),name='generate'),
]

