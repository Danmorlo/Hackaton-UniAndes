from django.db import models
from usuario.models import Usuario
# Create your models here.
class Producto(models.Model):
    nombre= models.CharField(max_length=200)
    descripcion= models.TextField()
    precio= models.DecimalField(max_digits= 10, decimal_places= 2)
    usuario=models.ForeignKey(Usuario,on_delete=models.CASCADE)
    imagen=models.ImageField(upload_to='images/')