from django.db import models
from django.contrib.auth.models import User


class Condominio (models.Model):
    nombre = models.CharField(max_length=50)

    propietario = models.ForeignKey(User, on_delete=models.RESTRICT)

    def __str__(self):
        return self.nombre


class Edificio (models.Model):
    nombre = models.CharField(max_length=30)
    departamentos = models.PositiveSmallIntegerField(default=0)
    pisos = models.PositiveSmallIntegerField(default=0)

    condominio = models.ForeignKey(Condominio, related_name='condominios', on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre


class Departamento (models.Model):
    numero = models.PositiveSmallIntegerField(default=0)
    piso = models.PositiveSmallIntegerField(default=0)

    edificios = models.ForeignKey(Edificio, related_name='edificios', on_delete=models.CASCADE)
    propietarios = models.ManyToManyField(User)

    def __str__(self):
        return self.numero

class Servicio (models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

class Pago (models.Model):
    monto_a_pagar = models.DecimalField(max_digits=9,decimal_places=2)
    monto_pagado = models.DecimalField(max_digits=9,decimal_places=2)
    numero_operacion = models.CharField(max_length=30)
    vencimiento = models.DateTimeField(null=True, blank=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now_add=True)
    

    departamento = models.ForeignKey(Departamento, related_name='pago_departamentos', on_delete=models.CASCADE)
    propietario = models.ForeignKey(User, related_name='pago_propietarios', on_delete=models.CASCADE)
    servicio = models.ForeignKey(Servicio, related_name='pago_servicios', on_delete=models.CASCADE)

    def __str__(self):
        return self.propietario
