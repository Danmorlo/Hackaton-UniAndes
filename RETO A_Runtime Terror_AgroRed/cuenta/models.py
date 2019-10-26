from django.db import models

# Create your models here.
class Cuenta(models.Model):
    saldo=models.IntegerField()