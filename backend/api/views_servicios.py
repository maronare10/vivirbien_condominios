# from rest_framework.decorators import api_view
# from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

from .models import Servicio
from .serializers import ServicioSerializer


class ServiciosListCreate(generics.ListCreateAPIView):
    queryset = Servicio.objects.all().order_by('-id')
    serializer_class = ServicioSerializer
    permission_classes = (IsAuthenticated),

    def get_queryset(self):
        propietario = self.request.user
        condominiosDelPropietario = propietario.condominio_set.all()
        return self.queryset.filter(condominio__in=condominiosDelPropietario)

class ServiciosRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer
    permission_classes = (IsAuthenticated),

    def get_queryset(self):
        propietario = self.request.user
        condominiosDelPropietario = propietario.condominio_set.all()
        return self.queryset.filter(condominio__in=condominiosDelPropietario)


# @api_view(['GET', 'POST'])
# def servicios(request):
#     if request.method == 'GET':
#         usuarioLogueado = request.user
#         condominiosDelUsuario = usuarioLogueado.condominio_set.all()
#         listaServicios = Servicio.objects.filter(condominio__in=condominiosDelUsuario).order_by('-id')
#         serializersServicios = ServicioSerializer(listaServicios, many=True)
#         return Response(serializersServicios.data)
#     elif request.method == 'POST':
#         serializersServicios = ServicioSerializer(data=request.data)
#         if serializersServicios.is_valid():
#             serializersServicios.save()
#             return Response(serializersServicios.data)
#         else:
#             return Response(serializersServicios.errors)


# @api_view(['GET', 'PUT', 'DELETE'])
# def servicio(request, servicio_id):
#     objetoServicio = Servicio.objects.get(id=servicio_id)
#     if request.method == 'GET':
#         serializersServicio = ServicioSerializer(objetoServicio)
#         return Response(serializersServicio.data)
#     elif request.method == 'PUT':
#         serializersServicio = ServicioSerializer(data=request.data)
#         if serializersServicio.is_valid():
#             serializersServicio.dave()
#             return Response(serializersServicio.data)
#         else:
#             return Response(serializersServicio.errors)
#     elif request.method == 'DELETE':
#         objetoServicio.delete()
#         return Response(status=204)
