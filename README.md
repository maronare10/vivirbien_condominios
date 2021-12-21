# VivirBien - Condominios

Este proyecto es el backend para el api de l administrador de condominios y está hecho con django, python, cloudinary, djangorestframework y será subido a Heroku.

Pueden ver el proyecto en el siguite enlace: 

* http://vivirbien.herokuapp.com/ (frontend)
* https://apivivirbien.herokuapp.com/admin/ (backend)


### PROYECTO BACKEND

Para iniciar el proyecto se deben ejecutar los siguientes comandos en el directorio backend si es la primera vez:

```
cd backend/

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

python manage.py migrate

python manage.py loaddata db

python manage.py runserver
```

> **NOTA SOBRE LOS USUARIOS:** existen tres tipos admin@vivirbien.com(superusuario, solo accede al admin de django), admin@santaelvira.com(admin de condominio, accede solo por el API sin restricciones solo a su condominio) y user#@santaelvira.com(usuario propietario, accede solo por el API con restricciones) y sobre las contraseñas pueden usar el comando "python manage.py changepassword".

### Como cargar data de prueba en backend nuevamente:

Se puede eliminar el archivo db.sqlite o usar el comando flush para limpiar la data.

El comando flush es para limpiar todos los registros de la base de datos:

```
python manage.py flush 
```

El comando loaddata es para cargar la data de prueba que se encuentra en db json:

```
python manage.py loaddata db 
```



### PROYECTO FRONTEND

Para instalar el proyecto debemos ejecutar los siguientes comandos si es la primera vez:

```
cd frontend/

npm install

npm start
```


### Páginas de referencia:

* Model field reference: https://docs.djangoproject.com/en/3.2/ref/models/fields/#model-field-types

* Como instalar jwt: https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html

* Para dar permisos a los endpoints: https://www.django-rest-framework.org/api-guide/permissions/

* Configuración por defecto de Simple JWT: https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html

* Propiedades para personalizar el administrador: https://docs.djangoproject.com/en/3.2/ref/contrib/admin/#django.contrib.admin.ModelAdmin.list_display

* Ayuda a personalizar los campos del administrador: https://docs.djangoproject.com/en/3.2/ref/contrib/admin/#the-display-decorator

* Documentación para desactivar la interfaz html para el API: https://www.django-rest-framework.org/api-guide/renderers/#jsonrenderer

* Documentación para deployar React con Heroku, cero configuración: https://blog.heroku.com/deploying-react-with-zero-configuration

* Documentación para la creación de la API con vistas basadas en clases, ApiViews de Django Restframework:  https://www.django-rest-framework.org/api-guide/generic-views/
https://www.cdrf.co/


### VALIDACIONES:

* Validado para que se creen edificios sólo dentro de la Residencial a la que pertenece el usuario.
* Validado para que se cree un único número de departamento por cada edificio.
* Validado para que no me cree edificios que pertenezcan a otra residencial de la que no es usuario.
* Validado para que me no se duplique el nombre del edificio por Residencial (no deben existir dos edificios con el mismo nombre).
* Validado para que no se dupliquen los nombres de los propietarios.
* Validado para que los propietarios sólo puedan visualizar sus pago y deudas, sin poder hacer modificaciones.
* Validado para que sólo sea el administrador del condominio quien pueda, crear, modificar o eliminar, edificios, departamentos y propietarios.
