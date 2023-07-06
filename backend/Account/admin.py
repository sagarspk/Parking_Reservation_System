from django.contrib import admin
from .models import User
from Parking.models import Park

admin.site.register(User)
admin.site.register(Park)