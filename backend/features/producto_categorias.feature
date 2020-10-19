# language: es


Característica: Vincular características a un producto
    
    Antecedentes:
        Dado que existen los siguientes productos 
        | Pollo         |
        | Carne         |
        | Detergente    |
        | Arroz         |
        | Tornillos     |
        | Televisión    |
              
        Y las siguientes categorias
        | Alimentos         |
        | Limpieza          |
        | Mecánica          |
        | Electrodomésticos |
        | Perecederos       |
        | Enlatados         |

        Entonces se utilizarán de prueba en los siguientes escenario
    
    Escenario: Registrando un producto
        Cuando se registra el producto con las siguientes categorias
        | producto | categoria   |
        | Atun     | Perecederos |
        | Atun     | Alimentos   |
        | Atun     | Enlatados   |

        Entonces se vinculan todas las categorias enviadas al producto registrado

    Escenario: Agregando o eliminando categorías a un producto
        Dado el producto "Detergente"
        Cuando se le agrega la categoria "Limpieza"
        Entonces el producto contiene en su lista la categoria agregada.

        Dado el producto "Atun"
        Cuando se requiere eliminarle la categoria "Enlatados"
        Entonces el producto ya no contiene en su lista la categoria agregada