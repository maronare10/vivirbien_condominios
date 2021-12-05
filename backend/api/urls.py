from django.urls import path
from django.urls.resolvers import URLPattern
from . import (
    views_condominios,
    views_servicios,
    views_edificios,
    views_departamentos,
    views_pagos,
)

urlpatterns = [
    path('registrar_condominio',views_condominios.registrar_condominio),
    
    path('condominios', views_condominios.CondominiosList.as_view()),

    path('edificios',views_edificios.EdificiosListCreate.as_view()),
    path('edificios/<int:pk>', views_edificios.EdificiosRetrieveUpdateDestroy.as_view()),
    
    path('departamentos', views_departamentos.DepartamentosListCreate.as_view()),
    path('departamentos/<int:pk>', views_departamentos.DepartamentosRetrieveUpdateDestroy.as_view()),

    path('servicios', views_servicios.servicios),
    path('servicios/<int:servicio_id>', views_servicios.servicio),

    path('pagos', views_pagos.PagosListCreate.as_view()),
    path('pagos/<int:pk>', views_pagos.PagosRetrieveUpdateDestroy.as_view()),
]