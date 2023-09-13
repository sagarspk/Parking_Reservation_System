from rest_framework.views import APIView
from rest_framework.response import Response
# from rest_framework.authentication import SessionAuthentication
# from django.core import serializers
from rest_framework import status
from django.contrib.auth import authenticate, login, logout,get_user_model
from .serializers import (UserSerializer,
                          LoginSerializer,
                          UserRegisterSerializer,
                          ControllerRegisterSerializer,
                          ForgetPasswordSerializer)
from .validations import (login_validation,
                          user_register_validation,
                          controller_register_validation)
from .sendemail import send_email
from .models import Customer,Controller

UserModel = get_user_model()

class UserAuthenticated(APIView):
    def get(self,request):
        user = request.user
        if(user.is_authenticated):
            user_data={'email':user.email,
                       'firstName':user.first_name,
                       'lastName':user.last_name,
                       'balance': user.customer.balance,
                       'contact':user.customer.contact,
                       'address':user.customer.address,
                       'PrimaryKey':user.pk}
            return Response(user_data,status=status.HTTP_200_OK)
        return Response("User is not Authenticated",status=status.HTTP_403_FORBIDDEN)


class UserLogin(APIView):
    def post(self, request):
        valid_data = login_validation(request.data)
        serializer = LoginSerializer(data=valid_data)
        if serializer.is_valid():
            user = authenticate(username=valid_data['email'],password=valid_data['password'])
            if user:
                # if(request.data['is_staff']!= user.is_staff):
                #     return Response("Controller Login Detected! Please login through controller login")
                login(request, user)
                user_data={'email':user.email,
                       'firstName':user.first_name,
                       'lastName':user.last_name,
                       'balance': user.customer.balance,
                       'contact':user.customer.contact,
                       'address':user.customer.address}
                # return Response(user_data,content_type='application/json',status=status.HTTP_200_OK)
                return Response(user_data , status=status.HTTP_200_OK)
            else:
                return Response('Invalid Credentials', status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserRegister(APIView):
	def post(self, request):
		valid_data = user_register_validation(request.data)
		serializer = UserRegisterSerializer(data=valid_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(valid_data)
			if user:
				return Response('User created Successfully', status=status.HTTP_201_CREATED)
		return Response("USer Registered successfully",status=status.HTTP_400_BAD_REQUEST)


class ControllerRegister(APIView):
	def post(self, request):
		valid_data = controller_register_validation(request.data)
		serializer = ControllerRegisterSerializer(data=valid_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(valid_data)
			if user:
				return Response('Controller Created Successfully', status=status.HTTP_201_CREATED)
		return Response('USer Registered successfully',status=status.HTTP_400_BAD_REQUEST)



class ControllerLogin(APIView):
    def post(self, request):
        valid_data = login_validation(request.data)
        serializer = LoginSerializer(data=valid_data)
        if serializer.is_valid():
            user = authenticate(username=valid_data['email'],password=valid_data['password'])
            if user:
                # if(request.data['is_staff']!= user.is_staff):
                #     return Response("Controller Login Detected! Please login through controller login")
                login(request, user)
                return Response('Controller logged in successfully.')
            else:
                return Response('Invalid credentials.', status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class Logout(APIView):
    def get(self, request):
        logout(request)
        return Response('User logged out successfully.')



class ForgetPassword(APIView):
    def post(self, request):
        if(request.data['email']):
            serializer = ForgetPasswordSerializer(data=request.data)
            if serializer.is_valid():
                subject = 'Password Recovery'
                recipients = request.data['email']
                otp = 345566
                message = 'Please enter the following OTP:'+ str(otp) +' to change you account password'
                result = send_email(subject,message,recipients)
                if(result==1):
                    return Response('Password reset instructions sent successfully.')
                else:
                    return Response('Password reset intruction failed, please enter valid email')
            else:
                return Response("serializer.errors", status=status.HTTP_400_BAD_REQUEST)


#https://myaccount.google.com/u/0/apppasswords
class VerifyEmail(APIView):
    def get(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            subject = 'Email Verification'
            otp = 345566
            message = 'Please enter the followinf OPT:'+ str(otp) +' to verify you account'
            send_email(subject,message,request.data['email'])
            return Response('Email verification instructions sent successfully.')
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def post(self,request):
        if(request.data['otp']==345566):
            return Response('Email Verified',status=status.HTTP_202_ACCEPTED)
        else:
            return Response('Email Verification failed',status=status.HTTP_401_UNAUTHORIZED)

class OTP(APIView):
    def post(self,request):
        if(request.data['OTP']=='345566'):
            return Response('User Found',status=status.HTTP_202_ACCEPTED)
        else:
            return Response(request.data['OTP'],status=status.HTTP_401_UNAUTHORIZED)

class ChangeForgetPassword(APIView):
    def post(self,request):
        if(UserModel.objects.filter(email=request.data['email'].exists)):
            new_password = request.data['password']
            u = UserModel.objects.get(email=request.data['email'])
            u.set_password(new_password)
            u.save()
            return Response('Password Reset Successful')
        else:
            return Response('Invalid Request')
            

class ChangePassword(APIView):
    def post(self,request):
        data = request.data
        current_password = data['old_password']
        new_password = data['new_password']
        user = request.user
        if user.check_password(current_password):
            user.set_password(new_password)
            user.save()
            return Response('Password changed successfully')
        else:
            return Response('Please enter valid old password',status=status.HTTP_400_BAD_REQUEST)
