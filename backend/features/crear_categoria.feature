# language: es

Característica: Manipular categorias
    Escenario: Registrar una nueva categoria
        Cuando se hace un http post a "/api/categoria", con informacion de la categoria [nombre]
        Entonces la categoria es guardada en la base de datos
        Y se asigna un identificador unico a la categoria.

        Cuando se envian datos incompletos a la url "/api/categoria"
        Entonces retorna un error al intentar ingresar una categoria.
        
    Escenario: Leer registros de categorias
        Cuando se hace un http get a categoria "/api/categoria"
        Entonces las categorias son retornadas en forma de lista.

        Cuando se hace un http get a categoria "/api/categoria/:consulta" y se envia como parametro :consulta una expresion regular de categoria
        Entonces la categoria es retornada en forma de lista

        Cuando se hace un http get a categoria "/api/categoria/:consulta" y se envia como parametro :consulta una expresion regular de categoria que no existe
        Entonces devuelve un error 404 en categoria

    Escenario: Modificar datos de una categoria
        Cuando se hace un http put a "/api/categoria/:nombre" y se envía como parámetro :nombre de una categoria y se envian el nuevo nombre para la categoria [nombre]
        Entonces la categoria es modificada exitosamente
        Y retornada en forma de objeto con los datos modificados de categoria

        Cuando se hace un http put a "/api/categoria/:nombre" y se envía como parámetro :nombre una de categoria que no existe
        Entonces devuelve un error 404
    
    Escenario: Eliminar una categoria
        Cuando se hace un http delete a "/api/categoria/:nombre" y se envía como parámetro :nombre un identificador de categoria
        Entonces la categoria es eliminada de la base de datos

        Cuando se hace un http delete a "/api/categoria/:nombre" y se envía como parámetro :nombre un identificador de categoria que no existe
        Entonces devuelve un error 404