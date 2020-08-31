module.exports = app => {
    const producto = require("../controllers/producto");

    var router = require("express").Router();
  
    // Create a new Productos
    router.post("/", producto.create);
  
    // Retrieve a single Productos with id
    router.get("/:codigo", producto.findOne);
  
    // Update a Productos with id
    router.put("/:codigo", producto.update);
  
    // Delete a Productos with id
    router.delete("/:codigo", producto.delete);



    app.use("/api/producto", router);
  };