from django.shortcuts import render
from rest_framework import serializers, status

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Servicio, Condominio
from .serializers import RegistrarCondominioSerializer, ServicioSerializer


@api_view(['POST'])
def registrar_condominio(request):
    serializer = RegistrarCondominioSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    new_user = serializer.save()
    data = RegistrarCondominioSerializer(new_user).data
    return Response(data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'POST'])
def servicios(request):
    if request.method == 'GET':
        listaServicios = Servicio.objects.all()
        serializersServicios = ServicioSerializer(listaServicios, many=True)
        return Response(serializersServicios.data)
    elif request.method == 'POST':
        serializersServicios = ServicioSerializer(data=request.data)
        if serializersServicios.is_valid():
            serializersServicios.save()
            return Response(serializersServicios.data)
        else:
            return Response(serializersServicios.errors)


@api_view(['GET', 'PUT', 'DELETE'])
def servicio(request, servicio_id):
    objetoServicio = Servicio.objects.get(id=servicio_id)
    if request.method == 'GET':
        serializersServicio = ServicioSerializer(objetoServicio)
        return Response(serializersServicio.data)
    elif request.method == 'PUT':
        serializersServicio = ServicioSerializer(data=request.data)
        if serializersServicio.is_valid():
            serializersServicio.dave()
            return Response(serializersServicio.data)
        else:
            return Response(serializersServicio.errors)
    elif request.method == 'DELETE':
        objetoServicio.delete()
        return Response(status=204)
