# language: es

Característica: Un vendedor puede registrar compras
    
    Antecedentes:
        Dado la bodega
        | Nombre                 | Id                       |
        | Departamento de Carnes | 5f8f69af771cac1e242ce934 |

        Y tiene en stock los siguientes productos
        | Nombre        | Cantidad (libras) | Precio por libra  | Id                        |
        | Pollo         | 20                | 35.50             | 5f6d138cf3e1670edc6aef07  |
        | Carne         | 10                | 50.00             | 5f6d13a29c48f710d40e1ed6  |
        | Cerdo         | 15                | 25.00             | 5f8f6976771cac1e242ce933  |

        Y el vendedor a cargo de las ventas de la bodega es
        | Nombre            | Correo                    | Id             |
        | Jose Martinez     | "josemartinez@gmail.com"  | 3001381800101  |
        
        Y atendera a un cliente, con los siguientes datos
        | Nombre         | Dirección     | NIT              |
        | Leonel Aguilar | Guatemala     | 25231134-2       |
        
    @important
    Escenario: Se realiza una venta
        Cuando el cliente realiza la siguiente compra

        | Producto | Cantidad comprada  | IdProducto                |
        | Pollo    | 5                  | 5f6d138cf3e1670edc6aef07  |
        | Carne    | 10                 | 5f6d13a29c48f710d40e1ed6  |
                        
        Entonces el vendedor realiza un ticket de venta y es guardada exitosamente
		
		