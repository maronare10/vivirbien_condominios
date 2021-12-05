from rest_framework import serializers
from .models import Condominio, Edificio, Departamento, Servicio, Pago
from django.contrib.auth import password_validation
from django.contrib.auth.models import Group, User, Group
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User

class RegistrarCondominioSerializer(serializers.Serializer):
  email = serializers.EmailField(
    validators = [UniqueValidator(queryset=User.objects.all())]
  )
  username = serializers.CharField(
    min_length=4,
    max_length=20,
    validators=[UniqueValidator(queryset=User.objects.all())]
  )
  condominio_nombre = serializers.CharField(min_length=1, max_length=30, write_only=True)
  password = serializers.CharField(min_length=8, max_length=64, write_only=True)
  password_confirmation = serializers.CharField(min_length=8, max_length=64, write_only=True)
  first_name = serializers.CharField(min_length=2, max_length=30)
  last_name = serializers.CharField(min_length=2, max_length=30)

  def validate(self, data):
    pwd = data['password']
    pwd_confirmation = data['password_confirmation']
    if (pwd != pwd_confirmation):
        raise serializers.ValidationError({"password_confirmation": "Las contraseñas no coinciden"})
    password_validation.validate_password(pwd)
    return data
  
  def create(self, data):
    GRUPO_ADMINISTRADOR = 'administrador'
    data.pop('password_confirmation')
    condominio_nombre = data.pop('condominio_nombre')
    condominio_propietario = User.objects.create_user(**data)
    if (condominio_propietario):
      Condominio.objects.create(nombre=condominio_nombre, propietario=condominio_propietario)
    
    grupo_admin = Group.objects.get(name=GRUPO_ADMINISTRADOR)
    condominio_propietario.groups.add(grupo_admin)

    return condominio_propietario

class CondominioSerializer(serializers.ModelSerializer):
  class Meta:
    model = Condominio
    fields = '__all__'

class EdificioSerializer(serializers.ModelSerializer):
  class Meta:
    model = Edificio
    fields = '__all__'

class DepartamentoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Departamento
    fields = '__all__'

class ServicioSerializer(serializers.ModelSerializer):
  class Meta:
    model = Servicio
    fields = '__all__'

class PagoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Pago
    fields = ['id', 'monto_a_pagar', 'vencimiento', 'departamento', 'servicio', 'pagado_por']

class PropietarioSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['username', 'first_name', 'last_name', 'email', ]