from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import (ParkingSpace,
                     Reservation,
                     Payment)
from .serializers import ParkSerializer
import datetime




class AddParking(APIView):
    def post(self,request):
        serializer = ParkSerializer(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class Reserve(APIView):
    def put(self,request):
        user = request.user
        data = request.data
        
        if not (user.is_authenticated):
            return Response("User Is not Authenticated",status=status.HTTP_401_UNAUTHORIZED)
        reserve = Reservation(user=user,parking=data['Parking'] ,start_time=datetime.datetime.now(),end_time=None,total_amount=None)
        reserve.save()
        return Response("Reservation Successfull",status=status.HTTP_201_CREATED)
        

    
class Allocate(APIView):
    def post(self,request):
        return 0

class Free(APIView):
    def patch(self,request):
        return 0
    
class ViewParking(APIView):
    def post(self,request):
        return 0
    
class GenerateReceipt(APIView):
    def post(self,request):
        return 0
    