from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from .serializers import (UserSerializer,
                          LoginSerializer,
                          UserRegisterSerializer,
                          ControllerRegisterSerializer,
                          ForgetPasswordSerializer)
from .validations import (login_validation,
                          user_register_validation,
                          controller_register_validation)
from .sendemail import send_email



class UserAuthenticated(APIView):
    def get(self,request):
        return request.user.is_authenticated()


class UserLogin(APIView):
    def post(self, request):
        valid_data = login_validation(request.data)
        serializer = LoginSerializer(data=valid_data)
        if serializer.is_valid():
            user = authenticate(username=valid_data['email'],password=valid_data['password'])
            if user:
                login(request, user)
                return Response('User Logged in Successfully.')
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
                login(request, user)
                return Response('Controller logged in successfully.')
            else:
                return Response('Invalid credentials.', status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class Logout(APIView):
    def post(self, request):
        logout(request)
        return Response('User logged out successfully.')



class ForgetPassword(APIView):
    def post(self, request):
        serializer = ForgetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            subject = 'Password Recovery'
            otp = 345566
            message = 'Please enter the followinf OPT:'+ str(otp) +' to change you account password'
            send_email(subject,message,request.data['email'])
            return Response('Password reset instructions sent successfully.')
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmail(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            subject = 'Email Verification'
            otp = 345566
            message = 'Please enter the followinf OPT:'+ str(otp) +' to verify you account'
            send_email(subject,message,request.data['email'])
            return Response('Email verification instructions sent successfully.')
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
