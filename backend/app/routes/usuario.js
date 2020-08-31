module.exports = app => {
    const usuario = require("../controllers/usuario");

    var router = require("express").Router();
  
    // Create a new Usuario
    router.post("/", usuario.create);
  
    // Retrieve a single Usuario with id
    router.get("/:dpi", usuario.findOne);
  
    // Update a Usuario with id
    router.put("/:dpi", usuario.update);
  
    // Delete a Usuario with id
    router.delete("/:dpi", usuario.delete);

    app.use("/api/usuario", router);
  };