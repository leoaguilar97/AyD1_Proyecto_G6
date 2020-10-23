module.exports = app => {
    const reportes = require("../controllers/reportes");

    var router = require("express").Router();

    // Reporte categorias
    router.get("/categoria", reportes.categorias);

    // Reporte producto
    router.get("/producto", reportes.productos);

    // Reporte vendedores
    router.get("/vendedor", reportes.vendedores);

    // Reporte vendedores
    router.get("/dia/:dia", reportes.dias);

    app.use("/api/reporte", router);
};