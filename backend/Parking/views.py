from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import (ParkingSpace,
                     Reservation,
                     Payment)
# from .serializers import ParkSerializer
from django.utils import timezone
from decimal import Decimal




class AddParking(APIView):
    def post(self,request):
        data = request.data
        park_obj = ParkingSpace(name=data['name'],location=data['location'],price_per_hour=data['price_per_hour'])
        park_obj.save()
        return Response("Parking space created",status=status.HTTP_201_CREATED)
        # serializer = ParkSerializer(data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data,status=status.HTTP_201_CREATED)
        # else:
        #     return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class Reserve(APIView):
    def put(self,request,pk):
        user = request.user
        data = request.data
        spot = data['spot']
        
        if not (user.is_authenticated):
            return Response("User Is not Authenticated",status=status.HTTP_401_UNAUTHORIZED)

        park_obj = ParkingSpace.objects.get(pk=pk)
        
        spotReservation(park_obj=park_obj,spot=spot,value=True)
        
        park_obj.save()
        
        reserve = Reservation(user=user,parking_space= park_obj , spot = spot,start_time=timezone.now(),end_time=None,total_amount=None)
        reserve.save()
        return Response(data = reserve.id,status=status.HTTP_201_CREATED)
        

    
class Allocate(APIView):
    def put(self,request,pk):
        user = request.user
        data = request.data
        spot = data['spot']
        
        park_obj = ParkingSpace.objects.get(pk=pk)
        spotReservation(park_obj=park_obj,spot=spot,value=True)
        park_obj.save()
        
        reserve = Reservation(user=user,parking_space= park_obj ,spot = spot ,start_time=timezone.now(),end_time=None,total_amount=None)
        reserve.save()
        return Response("Reservation Successfull",status=status.HTTP_201_CREATED)

class Free(APIView):
    def patch(self,request):
        user = request.user
        data = request.data
        id = data['id']
        
        reserve_obj = Reservation.objects.get(id=id)
        park_obj = ParkingSpace.objects.get(pk=reserve_obj.parking_space)
        spot = reserve_obj.spot
        
        spotReservation(park_obj=park_obj,spot=spot,value=False)
        park_obj.save()
        
        reserve_obj.end_time= timezone.now()
        time_difference = reserve_obj.end_time - reserve_obj.start_time
        minute_difference = time_difference.total_seconds()/60
        amount_per_minute= park_obj.price_per_hour / 60
        
        reserve_obj.total_amount=amount_per_minute* Decimal(minute_difference)
        reserve_obj.save()
        return Response("Freed",status=status.HTTP_202_ACCEPTED)
    
class ViewParking(APIView):
    def get(self,request):
        queryset = Reservation.objects.all()
        return 0
    
class GenerateReceipt(APIView):
    def post(self,request):
        return 0


def spotReservation(park_obj,spot,value):
    if(spot == "1"):
        park_obj.spot1=value
    elif(spot == "2"):
        park_obj.spot2=value
    elif(spot == "3"):
        park_obj.spot3=value
    elif(spot == "4"):
        park_obj.spot4=value
    elif(spot == "5"):
        park_obj.spot5=value
    elif(spot == "6"):
        park_obj.spot6=value
    elif(spot == "7"):
        park_obj.spot7=value
    elif(spot == "8"):
        park_obj.spot8=value
    elif(spot == "9"):
        park_obj.spot9=value
    elif(spot == "10"):
        park_obj.spot10=value