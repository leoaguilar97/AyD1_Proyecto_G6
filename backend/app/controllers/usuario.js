const db = require("../models");
const Usuario = db.usuario;

// Create and Save a new usuario
exports.create = (req, res) => {
    // Validate request
    if (!req.body.primerNombre||!req.body.primerApellido||!req.body.dpi
      ||!req.body.fechaNacimiento||!req.body.direccion||!req.body.numeroCelular) {
      res.status(400).send({ message: "Content can not be eimpty!" });
      return;
    }
  
    // Create a usuario
    const usuario = new Usuario({
      primerNombre: req.body.primerNombre,
      segundoNombre: req.body.segundoNombre,
      primerApellido: req.body.primerApellido,
      segundoApellido: req.body.segundoApellido,
      dpi: req.body.dpi,
      fechaNacimiento: req.body.fechaNacimiento,
      direccion: req.body.direccion,
      numeroCelular: req.body.numeroCelular
    });
      
    // Save usuario in the database
    usuario
      .save(usuario)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Usuario."
        });
      });
  };

// Find a single Usuario with an dpi
exports.findOne = (req, res) => {
    const dpi = req.params.dpi;
  
    Usuario.findOne({ dpi: dpi }, function(err, data) {
      if (err) { 
        res
        .status(500)
        .send({ message: "Error retrieving Usuario with dpi=" + dpi });
      } else {
        if(!data){
          res
          .status(404)
          .send({ message: "Not found Usuario with dpi " + dpi });
        }else{
          res.json(data);
        }
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Usuario with dpi=" + dpi });
    });
  };

// Update a Usuario by the dpi in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const dpi = req.params.dpi;
  console.log(req.body);
    Usuario.findByIdAndUpdate(dpi, req.body, { useFindAndModify: true })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Usuario with dpi=${dpi}. Maybe Usuario was not found!`
          });
        } else res.send({ message: "Usuario was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Usuario with dpi=" + dpi
        });
      });
  };

// Delete a Usuario with the specified dpi in the request
exports.delete = (req, res) => {
    const dpi = req.params.dpi;
  
    Usuario.findByIdAndRemove(dpi)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Usuario with id=${dpi}. Maybe Usuario was not found!`
          });
        } else {
          res.send({
            message: "Usuario was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Usuario with dpi=" + dpi
        });
      });
  };



