from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

from .models import Departamento, Pago, Edificio
from .serializers import PagoSerializer


class PagosListCreate(generics.ListCreateAPIView):
    queryset = Pago.objects.all().order_by('-id')
    serializer_class = PagoSerializer
    permission_classes = (IsAuthenticated),

    def get_queryset(self):
        propietario = self.request.user
        
        esAdministrador = propietario.groups.filter(name='administrador')
        esPropietario = propietario.groups.filter(name='propietario')
        
        if (esAdministrador.exists()):
            condominiosDelPropietario = propietario.condominio_set.all()
            edificiosEnLosCondominios = Edificio.objects.filter(condominio__in=condominiosDelPropietario)
            departamentosDeLosEdificios = Departamento.objects.filter(edificio__in=edificiosEnLosCondominios)
            pagosDeLosDepartamentos = Pago.objects.filter(departamento__in=departamentosDeLosEdificios)
            return pagosDeLosDepartamentos.all()
        elif(esPropietario.exists()):
            departamentosDelPropietario = propietario.departamento_set.all()
            return self.queryset.filter(departamento__in=departamentosDelPropietario)
        else:
            return []

class PagosRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer
    permission_classes = (IsAuthenticated),

    def get_queryset(self):
        propietario = self.request.user
        
        esAdministrador = propietario.groups.filter(name='administrador')
        esPropietario = propietario.groups.filter(name='propietario')
        
        if (esAdministrador.exists()):
            condominiosDelPropietario = propietario.condominio_set.all()
            edificiosEnLosCondominios = Edificio.objects.filter(condominio__in=condominiosDelPropietario)
            departamentosDeLosEdificios = Departamento.objects.filter(edificio__in=edificiosEnLosCondominios)
            pagosDeLosDepartamentos = Pago.objects.filter(departamento__in=departamentosDeLosEdificios)
            return pagosDeLosDepartamentos.all()
        elif(esPropietario.exists()):
            departamentosDelPropietario = propietario.departamento_set.all()
            return self.queryset.filter(departamento__in=departamentosDelPropietario)
        else:
            return []