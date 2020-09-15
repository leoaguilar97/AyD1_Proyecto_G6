module.exports = app => {

    const bodega = require("../controllers/bodega");

    var router = require("express").Router();

    // Create a new Bodega
    router.post("/", bodega.create);

    app.use("/api/bodega", router);
};