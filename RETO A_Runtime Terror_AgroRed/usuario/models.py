from django.db import models
from cuenta.models import Cuenta

# Create your models here.

class Usuario(models.Model):
    nombre=models.CharField(max_length=200)
    cedula=models.IntegerField()
    tipo  =models.CharField(max_length=100)  
    cuenta = models.ForeignKey(Cuenta, on_delete=models.CASCADE) #cuenta del cliente (one to one)