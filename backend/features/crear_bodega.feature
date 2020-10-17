# language: es

Característica: Manipular bodegas
    Escenario: Registrar una nueva bodega
        Cuando se hace un http post a "api/bodega", con informacion de la bodega [nombre, direccion]
        Entonces la bodega es guardada en la base de datos
        Y se asigna un identificador unico a la bodega.

        Cuando se envian datos incompletos a "http://127.0.0.1:5000/api/bodega"
        Entonces retorna un error.

    Escenario: Leer registros de bodegas
        Cuando se hace un http get a "http://127.0.0.1:5000/api/bodega"
        Entonces las bodegas son retornadas en forma de lista.

        Cuando se hace un http get a "http://127.0.0.1:5000/api/bodega/:id" y se envia como parametro :id un identificador de bodega
        Entonces la bodega es retornada en forma de objeto

        Cuando se hace un http get a "http://127.0.0.1:5000/api/bodega/:id" y se envia como parametro :id un identificador de bodega que no existe
        Entonces devuelve un error 404

    Escenario: Modificar datos de una bodega
        Cuando se hace un http put a "http://127.0.0.1:5000/api/bodega/:id" y se envía como parámetro :id un identificador de bodega y se envian datos nuevos de la bodega [nombre o direccion]
        Entonces la bodega es modificada exitosamente
        Y retornada en forma de objeto con los datos modificados

        Cuando se hace un http put a "http://127.0.0.1:5000/api/bodega/:id" y se envía como parámetro :id un identificador de bodega que no existe
        Entonces devuelve un error 404

    Escenario: Eliminar una bodega
        Cuando se hace un http delete a "http://127.0.0.1:5000/api/bodega/:id" y se envía como parámetro :id un identificador de bodega
        Entonces la bodega es eliminada de la base de datos

        Cuando se hace un http delete a "http://127.0.0.1:5000/api/bodega/:id" y se envía como parámetro :id un identificador de bodega que no existe
        Entonces devuelve un error 404

    Escenario: Agregar producutos a bodegas
        Cuando se hace un http post a "http://127.0.0.1:5000/api/bodega/productos"
        Entonces se espera un error 404 ya que la bodega no existe

        Dado una bodega que se le quieren inserter ciertos productos
        Cuando se hace un http post a "http://127.0.0.1:5000/api/bodega/productos" para agregar productos
        Entonces se insertan los productos de manera correcta
