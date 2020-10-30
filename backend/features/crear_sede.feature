# language: es

Característica: Manipulacion de sedes
    Escenario: Añadir una nueva sede
        Cuando se hace un http post a "/api/sede", con informacion de la sede [nombre, direccion, municipio, departamento, encargado]
        Entonces la sede es guardada en la base de datos
        Y se asigna un identificador unico a la sede.

        Cuando se envian datos incompletos de sede a "/api/sede"
        Entonces retorna un error en las sedes.

    Escenario: Leer las sedes registradas
        Cuando se hace un http get para obtener las sedes a "/api/sede"
        Entonces las sedes registradas son retornadas en forma de lista.

        Cuando se hace un http get a "/api/sede/:id" y se envia como parametro :id un identificador de sede
        Entonces la sede es retornada en forma de objeto.

        Cuando se hace un http get a "/api/sede/:id" y se envia como parametro :id un identificador de sede que no existe
        Entonces devuelve un error 404

    Escenario: Modificar datos de una sede
        Cuando se hace un http put a "/api/sede/:id" y se envía como parámetro :id un identificador de sede y se envian datos nuevos de la sede [nombre o direccion o municipio o departamento o encargado]
        Entonces la sede es modificada exitosamente
        Y retornada la sede en forma de objeto con los datos modificados

        Cuando se hace un http put a "/api/sede/:id" y se envía como parámetro :id un identificador de sede que no existe
        Entonces devuelve un error 404

    Escenario: Eliminar una sede
        Cuando se hace un http delete a "/api/sede/:id" y se envía como parámetro :id un identificador de sede
        Entonces la sede es eliminada de la base de datos

        Cuando se hace un http delete a "/api/sede/:id" y se envía como parámetro :id un identificador de sede que no existe
        Entonces devuelve un error 404