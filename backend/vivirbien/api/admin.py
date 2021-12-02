from django.contrib import admin

from .models import Condominio, Edificio, Departamento, Servicio, Pago


# Register your models here.

admin.site.register(Condominio)
admin.site.register(Edificio)
admin.site.register(Departamento)
admin.site.register(Servicio)
admin.site.register(Pago)

