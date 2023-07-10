from rest_framework import serializers
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model,authenticate
from .models import User, Controller


UserModel=get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'


class UserRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ['email','password', 'first_name', 'last_name','contact']
	def create(self, data):
		user_obj = UserModel.objects.create_user(username=data['contact'],email=data['email'], password=data['password'],first_name=data['first_name'],last_name=data['last_name'])
		user_obj.save()
		return user_obj

class ControllerRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['email','password']
    def create(self,data):
        user_obj = UserModel.objects.create_superuser(username=data['email'],password=data['password'])
        user_obj.save()
        return user_obj

class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField()
    def check_user(self,data):
        
        # u = UserModel.objects.get(username=data['username'])
        # if(u.check_password(data['password'])):
        #     raise ValidationError("User found")
        
        user = authenticate(username=data['username'],password=data['password'])
        if not user:
            raise ValidationError("User not found")
            # return data['email']
        return user

    

# class ControllerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserModel
#         fields = ['email', 'password']
#     def create(data):
#         user_obj = UserModel.objects.create_superuser(email=data['email'], password=data['password'])
#         user_obj.save()
#         return user_obj
        



# from rest_framework import serializers
# from django.contrib.auth import authenticate
# from django.core.exceptions import ValidationError
# from .models import User, Controller

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = '__all__'

# class UserLoginSerializer(serializers.Serializer):
# 	class Meta:
# 		model = User
# 		fields = '__all__'
 
# 	def check_user(self, clean_data):
# 		user = authenticate(email=clean_data['email'], password=clean_data['password'])
# 		if not user:
# 			return clean_data
# 		return user

# class ControllerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Controller
#         fields = '__all__'