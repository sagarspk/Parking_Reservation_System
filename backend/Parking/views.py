from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Account.models import Customer
from .models import (ParkingSpace,
                     Reservation,
                     Payment)
# from .serializers import ParkSerializer
from django.utils import timezone
from decimal import Decimal




class AddParking(APIView):
    def post(self,request):
        data = request.data
        park_obj = ParkingSpace(name=data['name'],location=data['location'],price_per_hour=data['price_per_hour'],is_open=data['open'])
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

        park_obj = ParkingSpace.objects.get(name =pk)
        # park_obj = get_object_or_404(ParkingSpace,pk)
        
        # spotReservation(park_obj=park_obj,spot=spot,value=True)
        setattr(park_obj,spot ,True)
        
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
        # park_obj = get_object_or_404(ParkingSpace,pk)
        # spotReservation(park_obj=park_obj,spot=spot,value=True)
        setattr(park_obj, spot,True)
        park_obj.save()
        
        reserve = Reservation(user=user,parking_space= park_obj ,spot = spot ,start_time=timezone.now(),end_time=None,total_amount=None)
        reserve.save()
        return Response("Reservation Successfull",status=status.HTTP_201_CREATED)

class Free(APIView):
    def patch(self,request):
        user = request.user
        data = request.data
        id = data['id']
        
        # reserve_obj = get_object_or_404(Reservation,id)
        # park_obj = get_object_or_404(ParkingSpace,reserve_obj.parking_space.pk)
        reserve_obj = Reservation.objects.get(id=id)
        park_obj = ParkingSpace.objects.get(pk=reserve_obj.parking_space.pk)
        
        spot = reserve_obj.spot
        
        # spotReservation(park_obj=park_obj,spot=spot,value=False)
        setattr(park_obj,spot,False)
        park_obj.save()
        
        reserve_obj.end_time= timezone.now()
        time_difference = reserve_obj.end_time - reserve_obj.start_time
        minute_difference = time_difference.total_seconds()/60
        amount_per_minute= park_obj.price_per_hour / 60
        
        total_amount = amount_per_minute* int(minute_difference)
        
        reserve_obj.total_amount=amount_per_minute* Decimal(minute_difference)
        reserve_obj.save()
        
        user_obj = Customer.objects.get(user = user)
        user_obj.balance = user_obj.balance - total_amount
        user_obj.save()
        
        return Response("Freed",status=status.HTTP_202_ACCEPTED)
    
class ViewParking(APIView):
    def get(self,request):
        parking = ParkingSpace.objects.all()
        park_data=[]
        for park in parking:
            park_data.append({'name':park.name,
                              'id': park.id,
                              'location':park.location,
                              'is_open':park.is_open,
                              'price_per_hour':park.price_per_hour})
        return Response(park_data,status=status.HTTP_200_OK)

class ViewParkingSpace(APIView):
    def get(self,request,pk):
        park_obj = ParkingSpace.objects.get(name=pk)
        user = request.user
        # if(user.is_authenticated):
        park_data = {
                    'spot1':park_obj.spot1,
                    'spot2':park_obj.spot2,
                    'spot3':park_obj.spot3,
                    'spot4':park_obj.spot4,
                    'spot5':park_obj.spot5,
                    'spot6':park_obj.spot6,
                    'spot7':park_obj.spot7,
                    'spot8':park_obj.spot8,
                    'spot9':park_obj.spot9,
                    'spot10':park_obj.spot10}
        return Response(park_data,status=status.HTTP_200_OK)
        # else:
        #     return Response("Login first",status=status.HTTP_401_UNAUTHORIZED)
class ViewReservation(APIView):
    def get(self,request,pk):
        reserve_obj = Reservation.objects.all().filter(user = pk)
        reserve_data = []
        for reserve in reserve_obj:
            time_difference = reserve.end_time - reserve.start_time
            minute_difference = float(time_difference.total_seconds()/60)
            reserve_data.append({'Date':reserve.start_time,
                                 'ID':reserve.id,
                                #  'vehicle':reserve.vehicle_number,
                                 'Location':reserve.parking_space.name,
                                 'Duration':minute_difference,
                                 'Amount':reserve.total_amount})
        return Response(reserve_data,status=status.HTTP_200_OK);
class GenerateReceipt(APIView):
    def post(self,request):
        return 0


# def spotReservation(park_obj,spot,value):
    # if(spot == "1"):
    #     park_obj.spot1=value
    # elif(spot == "2"):
    #     park_obj.spot2=value
    # elif(spot == "3"):
    #     park_obj.spot3=value
    # elif(spot == "4"):
    #     park_obj.spot4=value
    # elif(spot == "5"):
    #     park_obj.spot5=value
    # elif(spot == "6"):
    #     park_obj.spot6=value
    # elif(spot == "7"):
    #     park_obj.spot7=value
    # elif(spot == "8"):
    #     park_obj.spot8=value
    # elif(spot == "9"):
    #     park_obj.spot9=value
    # elif(spot == "10"):
    #     park_obj.spot10=value