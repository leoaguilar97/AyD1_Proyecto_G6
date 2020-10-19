# language: es

Característica: Un vendedor puede registrar compras
    
    Antecedentes:
        En la bodega
        | Identificador            | Nombre
        | 5f6020cde1f24eafd89243b9 | Departamento de Carnes

        Se encuentran los siguientes productos 
        | Nombre        | Cantidad (libras) | Precio por libra
        | Pollo         | 20                | 35.00
        | Carne         | 10                | 50.00
        | Cerdo         | 15                | 25.00

        El vendedor 
        | Identificador | Nombre            | Correo
        | fff           | Jose Martinez     | "josemartinez@gmail.com"
        
        Atiende a un cliente, con los siguientes datos
        | Nombre         | Dirección     | NIT
        | Leonel Aguilar | Guatemala     | 25231134-2
        
    @important
    Escenario: Se realiza una venta
        Cuando el cliente realiza la siguiente compra
        | Producto | Cantidad comprada  
        | Pollo    | 5                 
        | Carne    | 10
                        
        Entonces el vendedor realiza un ticket de venta
        Y se asigna la fecha de hoy, un código único y el total de la compra. 
		
		