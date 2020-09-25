module.exports = app => {

    const sede = require("../controllers/sede");

    var router = require("express").Router();

    // Crea una categoria
    router.post("/", sede.create);

    app.use("/api/sede", router);
};