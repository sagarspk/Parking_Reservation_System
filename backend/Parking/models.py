from django.db import models
from django.conf import settings


class ParkingSpace(models.Model):
    name    = models.CharField(max_length=30)
    location = models.CharField(max_length=255)
    price_per_hour = models.DecimalField(max_digits=5,decimal_places=2,default=80.00)
    # number_of_spot = models.IntegerField
    is_open = models.BooleanField(default=True)
    spot1   = models.BooleanField(default=False)
    spot2   = models.BooleanField(default=False)
    spot3   = models.BooleanField(default=False)
    spot4   = models.BooleanField(default=False)
    spot5   = models.BooleanField(default=False)
    spot6   = models.BooleanField(default=False)
    spot7   = models.BooleanField(default=False)
    spot8   = models.BooleanField(default=False)
    spot9   = models.BooleanField(default=False)
    spot10  = models.BooleanField(default=False)
    # spot11  = models.BooleanField(default=False)
    # spot12  = models.BooleanField(default=False)
    # spot13  = models.BooleanField(default=False)
    # spot14  = models.BooleanField(default=False)
    # spot15  = models.BooleanField(default=False)
    # spot16  = models.BooleanField(default=False)
    # spot17  = models.BooleanField(default=False)
    # spot18  = models.BooleanField(default=False)
    # spot19  = models.BooleanField(default=False)
    # spot20  = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name

class Reservation(models.Model):
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    parking_space = models.ForeignKey(ParkingSpace, on_delete=models.CASCADE)
    spot = models.TextField(null=True)
    vehicle_number = models.TextField
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True)
    total_amount = models.DecimalField(max_digits=8, decimal_places=2, null=True)



class Payment(models.Model):
    reservation = models.OneToOneField(Reservation, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=100)
    transaction_id = models.CharField(max_length=100)
    amount_paid = models.DecimalField(max_digits=8, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.transaction_id
    