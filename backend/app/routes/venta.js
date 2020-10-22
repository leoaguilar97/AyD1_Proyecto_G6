module.exports = app => {
    const venta = require("../controllers/venta");

    var router = require("express").Router();

    // Crear una nueva venta
    router.post("/", venta.create);

    app.use("/api/venta", router);
};