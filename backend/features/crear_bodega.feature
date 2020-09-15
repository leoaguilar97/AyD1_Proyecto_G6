# language: es

Característica: Manipular bodegas
    Escenario: Registrar una nueva bodega
        Cuando Se hace un http post a "http://127.0.0.1:5000/api/bodega", con informacion de la bodega [nombre, direccion]
        Entonces La bodega es guardada en la base de datos
        Y Se asigna un identificador unico a la bodega.

        Cuando Se envian datos incompletos a "http://127.0.0.1:5000/api/bodega"
        Entonces Retorna un error.

    Escenario: Leer registros de bodegas
        Cuando se hace un http get a "http://127.0.0.1:5000/api/bodega"
        Entonces las bodegas son leidas de la base de datos
        Y son retornadas en forma de lista.

        Cuando se hace un http get a "http://127.0.0.1:5000/api/bodega/:id" y se envia como parametro un identificador
        Entonces se busca la bodega en la base de datos
        Y se retorna en forma de objeto