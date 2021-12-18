from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework import serializers

from .models import Departamento, Edificio
from .serializers import DepartamentoSerializer
from .pagination import CustomPagination

class DepartamentosListCreate(generics.ListCreateAPIView):
    queryset = Departamento.objects.all().order_by('-id')
    serializer_class = DepartamentoSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = CustomPagination

    def get_queryset(self):
        condominiosDelUsuario = self.request.user.condominio_set.all()
        edificiosDelCondominio = Edificio.objects.filter(condominio__in=condominiosDelUsuario)
        return self.queryset.filter(edificio__in=edificiosDelCondominio)
    
    def perform_create(self, serializer):
        edificioAGuardar = serializer.validated_data['edificio']
        numeroAGuardar = serializer.validated_data['numero']

        
        condominiosDelUsuario = self.request.user.condominio_set.all()
        edificiosDelCondominio = Edificio.objects.filter(condominio__in=condominiosDelUsuario)
        edificioPerteneceAlCondominio = edificiosDelCondominio.filter(pk=edificioAGuardar.pk)

        edificioSeleccionado = edificiosDelCondominio.filter(pk=edificioAGuardar.pk)
        verificar = Departamento.objects.filter(edificio__in=edificioSeleccionado, numero=numeroAGuardar)
        
        
        if not edificioPerteneceAlCondominio.exists():
            raise serializers.ValidationError({ 'edificio': 'El edificio no existe' })

        if verificar.exists():
            raise serializers.ValidationError({ 'numero': 'El numero ya existe' })

        serializer.save()


class DepartamentosRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Departamento.objects.all()
    serializer_class = DepartamentoSerializer
    permission_classes = (IsAuthenticated),

    def get_queryset(self):
        condominiosDelUsuario = self.request.user.condominio_set.all()
        edificiosDelCondominio = Edificio.objects.filter(
            condominio__in=condominiosDelUsuario)
        return self.queryset.filter(edificio__in=edificiosDelCondominio)
