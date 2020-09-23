# language: es

Característica: Vincular características a un producto
    Escenario: Registrando un producto
        Cuando se registra un producto, realizando un http post a "http://127.0.0.1:5000/api/producto", y se envia una lista de identificadores de categorias
        Entonces se vinculan todas las categorias enviadas al producto registrado
        Y se agrega a cada categoría enviada el producto creado.

    Escenario: Agregando o eliminando categorías a un producto
        Dado un producto existente en la base de datos
        Cuando se envia un objeto con el atributo "categorias" con un http put a "http://127.0.0.1:5000/api/producto/:id"
        Entonces se vinculan todas las categorias enviadas al producto modificado
        Y se agrega a cada categoría enviada el producto modificado.

    Escenario: Eliminando una categoría
        Dada una categoría existente en la base de datos
        Cuando se elimina una categoría realizando una llamada http delete a "http://127.0.0.1:5000/api/categoria/:nombre"
        Entonces se eliminan todas las referencias a esa categoría en todos los productos vinculados a ella