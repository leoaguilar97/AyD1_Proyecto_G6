const db = require("../models");
const Producto = db.producto;

// Create and Save a new producto
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre) {
    res.status(400).send({ message: "Content can not be eimpty!" });
    return;
  }

  // Create a producto
  const producto = new Producto({
    nombre: req.body.nombre,
    categorias: req.body.categorias || [],
    proveedores: req.body.proveedores || [],
    bodegas: req.body.bodegas || []
  });

  // Save producto in the database
  producto
    .save(producto)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Producto."
      });
    });
};

// Find a single Producto with an codigo
exports.findOne = (req, res) => {
  const codigo = req.params.codigo;

  Producto.findOne({ _id: codigo }, function (err, data) {
    if (err) {
      res
        .status(500)
        .send({ message: "Error retrieving Producto with codigo=" + codigo });
    } else {
      if (!data) {
        res
          .status(404)
          .send({ message: "Not found Producto with codigo " + codigo });
      } else {
        res.json(data);
      }
    }
  })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Producto with codigo=" + codigo });
    });
};

// Update a Producto by the codigo in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const codigo = req.params.codigo;

  Producto.findOneAndUpdate({ _id: codigo}, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Producto with codigo=${codigo}. Maybe Producto was not found!`
        });
      } else res.send({ message: "Producto was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Producto with codigo=" + codigo
      });
    });
};

// Delete a Producto with the specified codigo in the request
exports.delete = (req, res) => {
  const codigo = req.params.codigo;

  Producto.findOneAndRemove({_id: codigo})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Producto with codigo=${codigo}. Maybe Producto was not found!`
        });
      } else {
        res.send({
          message: "Producto was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Producto with codigo=" + codigo
      });
    });
};

// Obtener todos los usuarios de la bd
exports.getAll = (req, res) => {
  Producto.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error al retornar todos los productos en la BD" })
    });
};
