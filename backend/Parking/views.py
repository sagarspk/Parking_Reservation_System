from django.shortcuts import render
from rest_framework.views import APIView


class Reserve(APIView):
    def post(self,request):
        return 0
    
class Allocate(APIView):
    def post(self,request):
        return 0

class Free(APIView):
    def post(self,request):
        return 0
    
class ViewParking(APIView):
    def post(self,request):
        return 0
    
class GenerateReceipt(APIView):
    def post(self,request):
        return 0
    