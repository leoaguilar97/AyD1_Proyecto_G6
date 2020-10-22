# language: es

Característica: Reporte de Ventas
    @edgar
    Escenario: Registrar una nueva bodega
        Cuando se hace un http post a "/api/bodega", con informacion de la bodega [nombre, direccion]
        Entonces la bodega es guardada en la base de datos
        Y se asigna un identificador unico a la bodega.

