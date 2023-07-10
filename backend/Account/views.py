from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from .serializers import UserSerializer,LoginSerializer, UserRegisterSerializer,ControllerRegisterSerializer
from .validations import login_validation,user_register_validation,controller_register_validation

class UserLogin(APIView):
    def post(self, request):
        valid_data = login_validation(request.data)
        serializer = LoginSerializer(data=valid_data)
        if serializer.is_valid():
            
            user = serializer.check_user(valid_data)
            if user:
                login(request, user)
                return Response({'message':'User Logged in Successfully.'})
            else:
                return Response({'message': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserRegister(APIView):
	def post(self, request):
		valid_data = user_register_validation(request.data)
		serializer = UserRegisterSerializer(data=valid_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(valid_data)
			if user:
				return Response({'message':'User created Successfully'}, status=status.HTTP_201_CREATED)
		return Response({"message" : "USer Registered successfully"},status=status.HTTP_400_BAD_REQUEST)

class ControllerRegister(APIView):
	def post(self, request):
		valid_data = controller_register_validation(request.data)
		serializer = ControllerRegisterSerializer(data=valid_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(valid_data)
			if user:
				return Response({'message':'Controller Created Successfully'}, status=status.HTTP_201_CREATED)
		return Response({"message" : "USer Registered successfully"},status=status.HTTP_400_BAD_REQUEST)



class ControllerLogin(APIView):
    def post(self, request):
        valid_data = login_validation(request.data)
        serializer = LoginSerializer(data=valid_data)
        if serializer.is_valid():
            
            controller = serializer.check_user(valid_data)
            if controller:
                login(request, controller)
                return Response({'message': 'Controller logged in successfully.'})
            else:
                return Response({'message': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Logout(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'User logged out successfully.'})


class ForgetPassword(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            
            return Response({'message': 'Password reset instructions sent successfully.'})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmail(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            # email_user(subject, message, from_email=None, **kwargs)
            # Sends an email to the user. If from_email is None, Django uses the DEFAULT_FROM_EMAIL. Any **kwargs are passed to the underlying send_mail() call.
  
            return Response({'message': 'Email verification instructions sent successfully.'})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangePassword(APIView):
    def post(self,request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            
            
            # u.set_password("new password")
            # u.save()
            # Returns True if the given raw string is the correct password for the user. (This takes care of the password hashing in making the comparison.)
            return Response({'message':'Password changed successfully'})
        else:
            return Response({'message':'Please enter valid password'},status=status.HTTP_400_BAD_REQUEST)



# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from django.contrib.auth import authenticate, login, logout
# from .serializers import UserSerializer, ControllerSerializer,UserLoginSerializer

# class UserLogin(APIView):
#     def post(self, request):
#         serializer = UserLoginSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.check_user(request.data)
#             if user:
#                 login(request, user)
#                 return Response({'message': 'User logged in successfully.'})
#             else:
#                 return Response({'message': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class Registration(APIView):
#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({'message': 'User registered successfully.'})
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class ControllerLogin(APIView):
#     def post(self, request):
#         serializer = ControllerSerializer(data=request.data)
#         if serializer.is_valid():
#             email = serializer.validated_data.get('email')
#             password = serializer.validated_data.get('password')

#             controller = authenticate(email=email, password=password)
#             if controller:
#                 login(request, controller)
#                 return Response({'message': 'Controller logged in successfully.'})
#             else:
#                 return Response({'message': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class Logout(APIView):
#     def post(self, request):
#         logout(request)
#         return Response({'message': 'User logged out successfully.'})

# class ForgetPassword(APIView):
#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
            
#             return Response({'message': 'Password reset instructions sent successfully.'})
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class VerifyEmail(APIView):
#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
            
#             return Response({'message': 'Email verification instructions sent successfully.'})
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)