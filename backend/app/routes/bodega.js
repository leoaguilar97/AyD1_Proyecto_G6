module.exports = app => {

    const bodega = require("../controllers/bodega");

    var router = require("express").Router();

    // Obtiene todas las bodegas
    router.get("/", bodega.getAll);
    
    // Retorna una bodega a partir de su codigo
    router.get("/:codigo", bodega.findOne);

    // Crea una bodega
    router.post("/", bodega.create);

    // Modifica una bodega a partir de su codigo
    router.put("/:codigo", bodega.update);

    // Elimina una bodega a partir de su codigo
    router.delete("/:codigo", bodega.delete);

    app.use("/api/bodega", router);
};