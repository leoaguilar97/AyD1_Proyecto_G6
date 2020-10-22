module.exports = app => {
    const venta = require("../controllers/venta");

    var router = require("express").Router();

    // Crear una nueva venta
    router.post("/", venta.create);
    router.get("/", venta.getAll);
    router.delete("/", venta.deleteAll);

    app.use("/api/venta", router);
};