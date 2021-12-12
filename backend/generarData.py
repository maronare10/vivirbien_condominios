from django.contrib.auth.models import User, Group
from api.models import Condominio, Departamento, Edificio, Servicio


grupo_administrador = Group.objects.create(name='administrador')
grupo_propietario = Group.objects.create(name='propietario')
print('Creando gupo: administrador')
print('Creando gupo: propietario')


User.objects.create_superuser(
  username='admin@vivirbien.com',
  email='admin@vivirbien.com' ,
  password='django123'
)
print('Creando super usuario: admin@vivirbien.com')

condominio_administrador = User.objects.create_user(
  username='admin@santaelvira.com',
  email='admin@santaelvira.com' ,
  password='django123'
)
condominio_administrador.groups.add(grupo_administrador)
print('Creando administrador de condominio: admin@santaelvira.com')

condominio = Condominio.objects.create(
  nombre="Santa Elvira",
  propietario=condominio_administrador
)
print('Creando condominio: Santa Elvira')

Servicio.objects.create(
  nombre="mantenimiento",
  condominio=condominio
)
print('Creando servicio: mantenimiento')

edificio_duraznos = Edificio.objects.create(
  nombre="Duraznos",
  departamentos=32,
  pisos=8,
  condominio=condominio
)
print('Creando edificio: Duraznos')

edificio_cedros = Edificio.objects.create(
  nombre="Cedros",
  departamentos=80,
  pisos=8,
  condominio=condominio
)
print('Creando edificio: Cedros')

nombres = ['', 'samy', 'leo', 'mate', 'vic']

for p in range(1, 9):
  for d in range(1, 5):
    username = '{}{}@santaelvira.com'.format(nombres[d], p)

    departamento_propietario = User.objects.create_user(
      username=username,
      email=username ,
      password='django123'
    )

    departamento_propietario.groups.add(grupo_propietario)

    numero = str(p) + "0" + str(d)

    departamento = Departamento.objects.create(
      numero=numero, 
      piso = p,
      edificio=edificio_duraznos,
    )

    departamento.propietarios.add(departamento_propietario)

    print("Creando departamento '{}' del edificio '{}' al propietario '{}'".format(numero, edificio_duraznos.nombre, departamento_propietario.email))

