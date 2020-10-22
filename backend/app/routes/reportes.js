module.exports = app => {
    const producto = require("../controllers/fecha");

    var router = require("express").Router();

    // Obtener todos los productos
    //router.get("/", producto.getAll);
  
    app.use("/api/reporte", router);
  };