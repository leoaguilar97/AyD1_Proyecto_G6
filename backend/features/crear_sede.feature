# language: es

Característica: Manipulacion de sedes
    Escenario: Añadir una nueva sede
        Cuando se hace un http post a "http://127.0.0.1:5000/api/sede", con informacion de la sede [nombre, direccion, municipio, departamento, encargado]
        Entonces la sede es guardada en la base de datos
        Y se asigna un identificador unico a la sede.

        Cuando se envian datos incompletos de sede a "http://127.0.0.1:5000/api/sede"
        Entonces retorna un error de creacion.