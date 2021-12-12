from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .models import Condominio, Edificio
from .serializers import EdificioSerializer
from rest_framework import serializers

class EdificiosListCreate(generics.ListCreateAPIView):
  queryset = Edificio.objects.all()
  serializer_class = EdificioSerializer 
  permission_class = (IsAuthenticated),

  def get_queryset(self):
    usuarioLogueado = self.request.user
    condominiosDelUsuario = usuarioLogueado.condominio_set.all()
    return self.queryset.filter(condominio__in=condominiosDelUsuario)

  def perform_create(self, serializer):
      condominioAGuardar = serializer.validated_data['condominio']
      nombreAGuardar = serializer.validated_data['nombre']

      condominiosDelUsuario = self.request.user.condominio_set.all()
      condominioPerteneceAlUsuario = condominiosDelUsuario.filter(pk=condominioAGuardar.pk)

      condominioSeleccionado = condominiosDelUsuario.filter(pk=condominioAGuardar.pk)
      verificar = Edificio.objects.filter(condominio__in=condominioSeleccionado, nombre=nombreAGuardar)

      if not condominioPerteneceAlUsuario.exists():
            raise serializers.ValidationError({ 'condominio': 'El condominio no existe' })
      
      if verificar.exists():
            raise serializers.ValidationError({ 'nombre': 'El nombre ya existe' })

      serializer.save()


class EdificiosRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
  queryset = Edificio.objects.all()
  serializer_class = EdificioSerializer
  permission_classes = (IsAuthenticated),

  def get_queryset(self):
    usuarioLogueado = self.request.user
    condominiosDelUsuario = usuarioLogueado.condominio_set.all()
    return self.queryset.filter(condominio__in=condominiosDelUsuario)

  
