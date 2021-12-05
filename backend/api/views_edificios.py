from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .models import Condominio, Edificio
from .serializers import EdificioSerializer

class EdificiosListCreate(generics.ListCreateAPIView):
  queryset = Edificio.objects.all()
  serializer_class = EdificioSerializer 
  permission_class = (IsAuthenticated),

  def get_queryset(self):
    usuarioLogueado = self.request.user
    condominiosDelUsuario = usuarioLogueado.condominio_set.all()
    return self.queryset.filter(condominio__in=condominiosDelUsuario)


class EdificiosRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
  queryset = Edificio.objects.all()
  serializer_class = EdificioSerializer
  permission_classes = (IsAuthenticated),

  def get_queryset(self):
    usuarioLogueado = self.request.user
    condominiosDelUsuario = usuarioLogueado.condominio_set.all()
    return self.queryset.filter(condominio__in=condominiosDelUsuario)
