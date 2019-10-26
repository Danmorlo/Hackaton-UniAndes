from django.shortcuts import render
from .models import Producto

# Create your views here.
def producto_view(request, *args,**kwargs):
    return render(request,"producto.html")
def producto_view_detail(request,id):
    obj=Producto.objects.get(id=id)
    context={
        "object": obj
    }
    return render(request,'detail.html',context)
