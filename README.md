# VivirBien - Condominios

Este proyecto es el backend para el api de l administrador de condominios y está hecho con django, python, cloudinary, djangorestframework y será subido a Heroku.

Para iniciar el proyecto se deben ejecutar los siguientes comandos en el directorio backend:

```
pip install -r requirements.txt

python manage.py runserver
```

### Como cargar data de prueba:

El comando flush es para limpiar todos los registros de la base de datos:

```
python manage.py flush 
```

El comando loaddata es para cargar la data de prueba que se encuentra en db json:

```
python manage.py loaddata db 
```

### Páginas de referencia:

* Model field reference: https://docs.djangoproject.com/en/3.2/ref/models/fields/#model-field-types

* Como instalar jwt: https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html

* Para dar permisos a los endpoints: https://www.django-rest-framework.org/api-guide/permissions/

* Configuración por defectode Simple JWT: https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html

* Propiedades para personalizar el administrador: https://docs.djangoproject.com/en/3.2/ref/contrib/admin/#django.contrib.admin.ModelAdmin.list_display

* Ayuda a personalizar los campos del administrador: https://docs.djangoproject.com/en/3.2/ref/contrib/admin/#the-display-decorator

* Documentación para desactivar la interfaz html para el API: https://www.django-rest-framework.org/api-guide/renderers/#jsonrenderer 


vALIDACIONES:
* Validado para que se creen edificios sólo dentro de la Residencial a la que pertenece el usuario.
* Validado para que se cree un único número de departamento por cada edificio.
* Validado para que no me cree edificios que pertenezcan a otra residencial de la que no es usuario.
* Validado para que me no se duplique el nombre del edificio por Residencial (no deben existir dos edificios con el mismo nombre).
