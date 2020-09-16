# language: es

Característica: Manipular bodegas
    Escenario: Registrar una nueva bodega
        Cuando se hace un http post a "http://127.0.0.1:5000/api/bodega", con informacion de la bodega [nombre, direccion]
        Entonces la bodega es guardada en la base de datos
        Y se asigna un identificador unico a la bodega.

        Cuando se envian datos incompletos a "http://127.0.0.1:5000/api/bodega"
        Entonces retorna un error.

    Escenario: Leer registros de bodegas
        Cuando se hace un http get a "http://127.0.0.1:5000/api/bodega"
        Entonces las bodegas son retornadas en forma de lista.

        Cuando se hace un http get a "http://127.0.0.1:5000/api/bodega/:id" y se envia como parametro :id un identificador de bodega
        Entonces la bodega es retornada en forma de objeto

    Escenario: Modificar datos de una bodega
        Cuando se hace un http put a "http://127.0.0.1:5000/api/bodega/:id" y se envía como parámetro :id un identificador de bodega y se envian datos nuevos de la bodega [nombre o direccion]
        Entonces la bodega es modificada exitosamente
        Y retornada en forma de objeto con los datos modificados