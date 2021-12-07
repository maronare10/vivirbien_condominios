from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['usuario_nombre'] = user.get_full_name() 
        # token['condominios'] = list(user.condominio_set.values('nombre'))
        token['condominio_nombre'] = user.condominio_set.first().nombre

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
