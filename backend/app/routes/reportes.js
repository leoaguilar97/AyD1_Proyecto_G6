module.exports = app => {
    const reportes = require("../controllers/reportes");

    var router = require("express").Router();

    // Reporte categorias
    router.get("/categoria", reportes.categorias);

    // Reporte producto
    router.get("/producto", reportes.productos);

    // Reporte vendedores
    router.get("/vendedor", reportes.vendedores);

    app.use("/api/reporte", router);
};