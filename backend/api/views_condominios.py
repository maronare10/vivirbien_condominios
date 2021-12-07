from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import Condominio
from .serializers import RegistrarCondominioSerializer, CondominioSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def registrar_condominio(request):
    serializer = RegistrarCondominioSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    new_user = serializer.save()
    data = RegistrarCondominioSerializer(new_user).data
    return Response(data, status=status.HTTP_201_CREATED)


class CondominiosList(generics.ListAPIView):
    queryset = Condominio.objects.all()
    serializer_class = CondominioSerializer
    permission_classes = (IsAuthenticated),

    def get_queryset(self):
        propietario = self.request.user
        return self.queryset.filter(propietario=propietario)