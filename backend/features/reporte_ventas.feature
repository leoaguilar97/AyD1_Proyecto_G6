# language: es

Característica: Reporte de Ventas
    @edgar
    Escenario: Reporte categorias
        Cuando se hace un http get a "/api/reporte/categoria" se devuelve una lista de categorias con el porcentaje de venta.
    @edgar
    Escenario: Reporte productos
        Cuando se hace un http get a "/api/reporte/productos" se devuelve una lista de productos con el porcentaje de venta.
