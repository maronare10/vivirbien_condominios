from django.db import models
from django.db.models.fields.related import ForeignKey

# Create your models here.


class Condominio (models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

class Edificio (models.Model):
  nombre = models.CharField(max_length=30)
  departamentos = models.PositiveSmallIntegerField(default=0)
  pisos = models.PositiveSmallIntegerField(default=0)

  condominio = models.ForeignKey(Condominio, related_name='condminios', on_delete=models.CASCADE)

  def __str__(self):
    return self.nombre

# class Departamento (models.Model):


      


