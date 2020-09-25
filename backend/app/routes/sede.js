module.exports = app => {

    const sede = require("../controllers/sede");

    var router = require("express").Router();

    // Crea una sede
    router.post("/", sede.create);

    // Obtiene todas las sedes
    router.get("/", sede.getAll);

    app.use("/api/sede", router);
};