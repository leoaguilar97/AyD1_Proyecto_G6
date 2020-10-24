module.exports = app => {
    const reportes = require("../controllers/reportes");

    var router = require("express").Router();

    // Reporte categorias
    router.post("/categoria", reportes.categorias);

    // Reporte producto
    router.post("/producto", reportes.productos);

    // Reporte vendedores
    router.post("/vendedor", reportes.vendedores);

    // Reporte dia
    router.post("/dia", reportes.dias);

    // Reporte mes
    router.post("/mes", reportes.mes);

    // Reporte ano
    router.post("/ano", reportes.ano);

    app.use("/api/reporte", router);
};