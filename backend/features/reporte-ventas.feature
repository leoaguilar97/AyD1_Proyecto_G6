# language: es

Característica: Reporte Ventas
    @edgar
    Escenario: Obtener datos
        Cuando se hace un http post a "/api/bodega", con informacion de la bodega [nombre, direccion]
        Entonces la bodega es guardada en la base de datos
        Y se asigna un identificador unico a la bodega.

        Escenario: Leer registros de bodegass
        Cuando se hace un http get a "/api/bodega"s
        Entonces las bodegas son retornadas en forma de listas.
