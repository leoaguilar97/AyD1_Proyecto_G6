module.exports = app => {

    const sede = require("../controllers/sede");

    var router = require("express").Router();

    // Crea una sede
    router.post("/", sede.create);

    // Obtiene todas las sedes
    router.get("/", sede.getAll);

    // Retorna una sede a partir de su codigo
    router.get("/:codigo", sede.findOne);

    // Modifica una sede a partir de su codigo
    router.put("/:codigo", sede.update);

    app.use("/api/sede", router);
};