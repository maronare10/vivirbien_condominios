from rest_framework import status

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import RegistrarCondominioSerializer


@api_view(['POST'])
def registrar_condominio(request):
    serializer = RegistrarCondominioSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    new_user = serializer.save()
    data = RegistrarCondominioSerializer(new_user).data
    return Response(data, status=status.HTTP_201_CREATED)