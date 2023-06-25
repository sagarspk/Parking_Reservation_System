from django.db import models


class Park(models.Model):
    name    = models.CharField(max_length=30,primary_key=True)
    is_open = models.BooleanField
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
    