from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

class Login(APIView):
    def post(self, request):
        return 0
class Register(APIView):
    def post(self, request):
        return 0
class Logout(APIView):
    def post(self, request):
        return 0
class ForgetPassword(APIView):
    def post(self,request):
        return 0

class VerifyEmail(APIView):
    def post(self,request):
        return 0