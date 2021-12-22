from django.contrib import admin

from .models import Condominio, Edificio, Departamento, Servicio, Pago


class DepartamentoAdmin(admin.ModelAdmin):
    list_display = ('numero', 'piso', 'edificio', 'get_condominio', 'get_propietarios')
    filter_horizontal = ('propietarios',)

    @admin.display(description='Condominio')
    def get_condominio(self, obj):
        return obj.edificio.condominio.nombre
    
    @admin.display(description='Propietarios')
    def get_propietarios(self, obj):
        return "\n".join([p.username for p in obj.propietarios.all()])

class PagoAdmin(admin.ModelAdmin):
    list_display = ('departamento','servicio','pagado_por', 'monto_a_pagar', 'monto_pagado', 'vencimiento', 'fecha_creacion', 'fecha_actualizacion')

class ServicioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'condominio')

class CondominioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'propietario')

class EdificioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'departamentos', 'pisos', 'condominio')

admin.site.register(Condominio, CondominioAdmin)
admin.site.register(Edificio, EdificioAdmin)
admin.site.register(Departamento, DepartamentoAdmin)
admin.site.register(Servicio, ServicioAdmin)
admin.site.register(Pago, PagoAdmin)

