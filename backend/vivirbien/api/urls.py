from django.urls import path
from django.urls.resolvers import URLPattern

from . import views

urlpatterns = [
    path('servicios/', views.servicios),
    path('servicios/<int:servicio_id>', views.servicio),
]