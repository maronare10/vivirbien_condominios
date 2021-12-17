from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['usuario_nombre'] = user.get_full_name()
        token['username'] = user.username

        esAdministrador = user.groups.filter(name='administrador')
        esPropietario = user.groups.filter(name='propietario')

        if (esAdministrador.exists()):
            token['role'] = 'administrador'
        elif(esPropietario.exists()):
            token['role'] = 'propietario'
        else:    
            token['role'] = 'desconocido'

        condominio_nombre = user.condominio_set.first()
        departamento_nombre = user.departamento_set.first()

        if (condominio_nombre):
            token['condominio_nombre'] = condominio_nombre.nombre
        elif (departamento_nombre):
            token['condominio_nombre'] = departamento_nombre.edificio.condominio.nombre

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
