# language: es

Característica: Reporte Ventas
    @edgar
    Escenario: Obtener datos
        Cuando se hace un http post a "/api/bodega", con informadcion de la bodega [nombre, direccion]
        Entonces la bodega es guardada en la base de dadtos
        Y se asigna un identificador unico a la bodedga.