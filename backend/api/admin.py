from django.contrib import admin

from .models import Condominio, Edificio, Departamento, Servicio, Pago


class DepartamentoAdmin(admin.ModelAdmin):
    list_display = ('numero', 'piso', 'edificio', 'get_condominio')

    @admin.display(description='Condominio')
    def get_condominio(self, obj):
        return obj.edificio.condominio.nombre

admin.site.register(Condominio)
admin.site.register(Edificio)
admin.site.register(Departamento, DepartamentoAdmin)
admin.site.register(Servicio)
admin.site.register(Pago)

