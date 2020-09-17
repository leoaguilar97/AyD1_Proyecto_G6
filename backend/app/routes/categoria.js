module.exports = app => {

    const categoria = require("../controllers/categoria");

    var router = require("express").Router();

    // Obtiene todas las categorias
    router.get("/", categoria.getAll);

    // Retorna una categoria a partir de su codigo
    router.get("/:consulta", categoria.find);

    // Crea una categoria
    router.post("/", categoria.create);

    // Modifica una categoria a partir de su codigo
    router.put("/:nombre", categoria.update);

    // Elimina una categoria a partir de su codigo
    router.delete("/:nombre", categoria.delete);

    app.use("/api/categoria", router);
};