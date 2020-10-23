module.exports = app => {
    const reportes = require("../controllers/reportes");

    var router = require("express").Router();

    // Reporte categorias
    router.get("/categoria", reportes.categorias);

    // Reporte producto
    router.get("/producto", reportes.productos);

    // Reporte vendedores
    router.get("/vendedor", reportes.vendedores);

    // Reporte dia
    router.get("/dia/:dia", reportes.dias);

    // Reporte mes
    router.get("/mes/:mes", reportes.mes);

    // Reporte ano
    router.get("/ano/:ano", reportes.ano);

    app.use("/api/reporte", router);
};