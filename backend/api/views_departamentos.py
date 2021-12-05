from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

from .models import Departamento, Edificio
from .serializers import DepartamentoSerializer


class DepartamentosListCreate(generics.ListCreateAPIView):
    queryset = Departamento.objects.all()
    serializer_class = DepartamentoSerializer
    permission_classes = (IsAuthenticated),

    def get_queryset(self):
        condominiosDelUsuario = self.request.user.condominio_set.all()
        edificiosDelCondominio = Edificio.objects.filter(condominio__in=condominiosDelUsuario)
        return self.queryset.filter(edificios__in=edificiosDelCondominio)


class DepartamentosRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Departamento.objects.all()
    serializer_class = DepartamentoSerializer
    permission_classes = (IsAuthenticated),

    def get_queryset(self):
        condominiosDelUsuario = self.request.user.condominio_set.all()
        edificiosDelCondominio = Edificio.objects.filter(
            condominio__in=condominiosDelUsuario)
        return self.queryset.filter(edificios__in=edificiosDelCondominio)
