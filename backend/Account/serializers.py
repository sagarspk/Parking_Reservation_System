from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from .models import Customer, Controller


UserModel=get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'
    def create(self,data):
        user_obj = UserModel.objects.create_user(email=data['email'],password=data['password'],first_name=data['first_name'],last_name=data['last_name'])
        user_obj.save()
        customer_obj = Customer.objects.create(user=user_obj,contact = data['contact'], address = data['address'])
        customer_obj.save()
        return user_obj


class ControllerRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['email','password']
    def create(self,data):
        user_obj = UserModel.objects.create_superuser(email=data['email'],password=data['password'])
        user_obj.save()
        controller_obj = Controller.objects.create(user = user_obj )
        return user_obj

class LoginSerializer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField()

    # def check_user(self,data):
        
    #     # u = UserModel.objects.get(username=data['username'])
    #     # if(u.check_password(data['password'])):
    #     #     raise ValidationError("User found")
        
    #     user = authenticate(username=data['email'],password=data['password'])
    #     if not user:
    #         raise ValidationError("User not found")
    #         # return data['email']
    #     return user

class ForgetPasswordSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    
    def Validate_email(self,data):
        if not UserModel.objects.filter(email = data['email']).exists():
            raise ValidationError("Email not found")
        return data
            

# class ControllerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserModel
#         fields = ['email', 'password']
#     def create(data):
#         user_obj = UserModel.objects.create_superuser(email=data['email'], password=data['password'])
#         user_obj.save()
#         return user_obj