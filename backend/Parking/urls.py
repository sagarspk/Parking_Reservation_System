from django.urls import path
from .views import Reserve,Free,ViewParking,Allocate,GenerateReceipt

urlpatterns = [
    path('reserve',Reserve.as_view(),name='reserve'),
    path('free',Free.as_view(),name='free'),
    path('view',ViewParking.as_view(),name='view'),
    path('allocate',Allocate.as_view(),name='allocate'),
    path('generate',GenerateReceipt.as_view(),name='generate'),
]

