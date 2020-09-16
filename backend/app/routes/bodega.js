module.exports = app => {

    const bodega = require("../controllers/bodega");

    var router = require("express").Router();

    // Obtener todas las bodegas
    router.get("/", bodega.getAll);
    
    // Retrieve a single Productos with id
    router.get("/:codigo", bodega.findOne);

    // Create a new Bodega
    router.post("/", bodega.create);

    // Update a Productos with id
    router.put("/:codigo", bodega.update);

    app.use("/api/bodega", router);
};