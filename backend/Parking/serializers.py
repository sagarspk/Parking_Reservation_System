from rest_framework import serializers
from django.core.exceptions import ValidationError
from .models import (ParkingSpace,
                     Reservation,
                     Payment)

class ParkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingSpace
        field = ['name','location','price_per_hour']

# class ReservationSericalizer(serializers.ModelSerializer):
#     class Meta:
#         model = Reservation
#         field = []