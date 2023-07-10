from django.db import models
# from django.contrib.auth import get_user_model

# UserModel = get_user_model()


class ParkingSpace(models.Model):
    name    = models.CharField(max_length=30,primary_key=True)
    location = models.CharField(max_length=255)
    price_per_hour = models.DecimalField(max_digits=4,decimal_places=2,default=80.00)
    is_open = models.BooleanField(False)
    spot1   = models.BooleanField
    spot2   = models.BooleanField
    spot3   = models.BooleanField
    spot4   = models.BooleanField
    spot5   = models.BooleanField
    spot6   = models.BooleanField
    spot7   = models.BooleanField
    spot8   = models.BooleanField
    spot9   = models.BooleanField
    spot10  = models.BooleanField
    
    def __str__(self):
        return self.name

# class Reservation(models.Model):
#     user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
#     parking_space = models.ForeignKey(ParkingSpace, on_delete=models.CASCADE)
#     start_time = models.DateTimeField()
#     end_time = models.DateTimeField()
#     total_amount = models.DecimalField(max_digits=8, decimal_places=2)

#     def __str__(self):
#         return f"{self.user.username} - {self.parking_space.name}"


# class Payment(models.Model):
#     reservation = models.OneToOneField(Reservation, on_delete=models.CASCADE)
#     payment_method = models.CharField(max_length=100)
#     transaction_id = models.CharField(max_length=100)
#     amount_paid = models.DecimalField(max_digits=8, decimal_places=2)
#     payment_date = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.transaction_id
    