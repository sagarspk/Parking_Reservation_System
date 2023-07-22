from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from Parking.models import ParkingSpace

class UserModelManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set.")
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        
        return self.create_user(email, password, **extra_fields)


class UserModel(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    password = models.CharField(max_length=254)
    is_staff = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserModelManager()

    def __str__(self):
        return self.first_name+' '+self.last_name

class Customer(models.Model):
    user    = models.OneToOneField(UserModel, on_delete=models.CASCADE, related_name='customer')
    contact = models.CharField(max_length=10)
    address = models.CharField(max_length=255)
    balance = models.DecimalField(max_digits=10,decimal_places=2,default=0.00)
    
    def __str__(self):
        return self.user.first_name+self.user.last_name
    
class Controller(models.Model):
    user    = models.OneToOneField(UserModel, on_delete=models.CASCADE, related_name='controller')
    park    = models.OneToOneField(ParkingSpace, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.user.email


# class UserManager(models.Manager):
#     def create_user(self, email, password=None,balance=0.0,**extra_field):
#         if not email:
#             raise ValueError('An email is required.')
#         if not password:
#             raise ValueError('A password is required.')
#         email = self.normalize_email(email) 
#         user = self.model(email=email,**extra_field)
#         user.set_password(password)
#         user.save()
#         return user

# class User(models.Model):
#     first_name  = models.CharField(max_length=30)
#     last_name   = models.CharField(max_length=30)
#     email       = models.EmailField(max_length=50,primary_key=True,unique=True)
#     username    = models.CharField(max_length=10)
#     password    = models.CharField(max_length=254)
#     balance     = models.DecimalField(max_digits=10,decimal_places=2)
    
#     # objects = UserManager()
    
#     def __str__(self):
#         return self.first_name+' '+self.last_name

    
# class Controller(models.Model):
#     email       = models.EmailField(max_length=50,primary_key=True)
#     password    = models.CharField(max_length=254)
#     park        = models.ForeignKey(ParkingSpace,on_delete=models.CASCADE)
    
#     # objects = UserManager()
    
#     def __str__(self):
#         return self.email