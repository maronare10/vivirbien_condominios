from django.urls import path

from . import views

urlpatterns = [
    path('servicios', views.servicios),
    path('servicios/<int:servicio_id>', views.servicio),
    path('registrar_condominio', views.registrar_condominio),


]