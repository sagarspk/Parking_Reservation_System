from django.db import models

# Create your models here.
class User(models.Model):
    first_name  = models.CharField(max_length=30)
    last_name   = models.CharField(max_length=30)
    email       = models.EmailField(max_length=50,primary_key=True,unique=True)
    contact     = models.BigIntegerField()
    password    = models.CharField(max_length=254)
    balance     = models.DecimalField(max_digits=10,decimal_places=2)
    
class Controller(models.Model):
    email       = models.EmailField(max_length=50)
    password    = models.CharField(max_length=254)
    
