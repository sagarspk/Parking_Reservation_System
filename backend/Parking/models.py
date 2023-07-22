from django.db import models
from django.conf import settings


class ParkingSpace(models.Model):
    name    = models.CharField(max_length=30)
    location = models.CharField(max_length=255)
    price_per_hour = models.DecimalField(max_digits=4,decimal_places=2,default=80.00)
    is_open = models.BooleanField(False)
    spot1   = models.BooleanField(False)
    spot2   = models.BooleanField(False)
    spot3   = models.BooleanField(False)
    spot4   = models.BooleanField(False)
    spot5   = models.BooleanField(False)
    spot6   = models.BooleanField(False)
    spot7   = models.BooleanField(False)
    spot8   = models.BooleanField(False)
    spot9   = models.BooleanField(False)
    spot10  = models.BooleanField(False)
    
    def __str__(self):
        return self.name

class Reservation(models.Model):
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    parking_space = models.ForeignKey(ParkingSpace, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    total_amount = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"{self.user.username} - {self.parking_space.name}"


class Payment(models.Model):
    reservation = models.OneToOneField(Reservation, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=100)
    transaction_id = models.CharField(max_length=100)
    amount_paid = models.DecimalField(max_digits=8, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.transaction_id
    