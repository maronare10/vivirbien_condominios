from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

from .models import Pago
from .serializers import PagoSerializer


class PagosListCreate(generics.ListCreateAPIView):
    queryset = Pago.objects.all().order_by('-id')
    serializer_class = PagoSerializer
    permission_classes = (IsAuthenticated),

    def get_queryset(self):
        propietario = self.request.user
        departamentosDelPropietario = propietario.departamento_set.all()
        return self.queryset.filter(departamento__in=departamentosDelPropietario)

class PagosRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer
    permission_classes = (IsAuthenticated),

    def get_queryset(self):
        propietario = self.request.user
        departamentosDelPropietario = propietario.departamento_set.all()
        return self.queryset.filter(departamento__in=departamentosDelPropietario)
