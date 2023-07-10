from django.contrib import admin
from django.contrib.auth import get_user_model
from Parking.models import ParkingSpace

User = get_user_model()

admin.site.register(User)
admin.site.register(ParkingSpace)