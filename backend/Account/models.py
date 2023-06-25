from django.db import models
from Parking.models import Park


class User(models.Model):
    first_name  = models.CharField(max_length=30)
    last_name   = models.CharField(max_length=30)
    email       = models.EmailField(max_length=50,primary_key=True,unique=True)
    contact     = models.CharField(max_length=10)
    password    = models.CharField(max_length=254)
    balance     = models.DecimalField(max_digits=10,decimal_places=2)
    
    def __str__(self):
        return self.first_name+self.last_name

    
class Controller(models.Model):
    email       = models.EmailField(max_length=50,primary_key=True)
    password    = models.CharField(max_length=254)
    park        = models.ForeignKey(Park,on_delete=models.CASCADE)
    
    def __str__(self):
        return self.email
    
    
    
