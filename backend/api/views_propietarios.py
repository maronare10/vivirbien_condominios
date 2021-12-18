from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

from django.contrib.auth.models import User, Group
from .models import Departamento, Edificio
from .serializers import PropietarioSerializer


class PropietariosListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all().order_by('-id')
    serializer_class = PropietarioSerializer
    permission_classes = (IsAuthenticated),

    def get_queryset(self):
        usuarioLogueado = self.request.user
        condominiosDelUsuario = usuarioLogueado.condominio_set.all()
        edificiosDelCondominio = Edificio.objects.filter(condominio__in=condominiosDelUsuario)
        departamentosDeLosEdificios = Departamento.objects.filter(edificio__in=edificiosDelCondominio)
        propietariosDeLosDepartamentos = []
        for departamento in departamentosDeLosEdificios:
          propietariosDeLosDepartamentos.append(departamento.propietarios.values('id'))
        GRUPO_PROPIETARIO = 'propietario'
        return self.queryset.filter(pk__in=propietariosDeLosDepartamentos, groups__name=GRUPO_PROPIETARIO)
    
    def perform_create(self, serializer):
        GRUPO_POR_DEFECTO = 'propietario'
        nuevoPropietario = serializer.save()
        grupo_por_defecto = Group.objects.get(name=GRUPO_POR_DEFECTO)
        nuevoPropietario.groups.add(grupo_por_defecto)
        

class PropietariosRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = PropietarioSerializer
    permission_classes = (IsAuthenticated),
