# language: es

@edgar
Característica: Un usuario genere reportes de Ventas
    Escenario: Reporte por categorias
        Cuando el usuario realiza un reporte por categorias y se devuelven los datos del reporte.

    Escenario: Reporte por productos
        Cuando el usuario realiza un reporte por productos y se devuelven los datos para el reporte.

    Escenario: Reporte por vendedores
        Cuando el usuario realiza un reporte por vendedores y se devuelven los datos para el reporte.

    Escenario: Reporte por dia
        Cuando el usuario realiza un reporte por dia, el dia "2020-10-21" por ejemplo.
        Entonces se devuelven los datos para el reporte.

    Escenario: Reporte por mes
        Cuando el usuario realiza un reporte por mes, el mes "2020-10" por ejemplo.
        Entonces se devuelven los datos para el reporte del mes.