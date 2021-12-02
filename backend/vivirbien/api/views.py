from django.shortcuts import render
from rest_framework import serializers

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Servicio
from .serializers import ServicioSerializer


@api_view(['GET'])
def servicios(request):
    listaServicios = Servicio.objects.all()
    serializersServicios = ServicioSerializer(listaServicios, many=True)
    return Response(serializersServicios.data)
