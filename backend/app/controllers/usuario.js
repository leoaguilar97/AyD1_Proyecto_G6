const db = require("../models");
const Usuario = db.usuario;

// Create and Save a new usuario
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre || !req.body.apellido || !req.body.dpi
    || !req.body.correo || !req.body.password) {
    res.status(400).send({ message: "Content can not be eimpty!" });
    return;
  }

  // Create a usuario
  const usuario = new Usuario({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    dpi: req.body.dpi,
    correo: req.body.correo,
    fechaNacimiento: req.body.fechaNacimiento,
    direccion: req.body.direccion,
    numeroCelular: req.body.numeroCelular,
    password: bcrypt.hashSync(req.body.password, 8),
    roles: req.body.roles || []
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

  Usuario.findOne({ dpi: dpi }, function (err, data) {
    if (err) {
      res
        .status(500)
        .send({ message: "Error retrieving Usuario with dpi=" + dpi });
    } else {
      if (!data) {
        res
          .status(404)
          .send({ message: "Not found Usuario with dpi " + dpi });
      } else {
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

  let dpi = req.params.dpi;

  Usuario.findOneAndUpdate({ dpi: dpi }, req.body)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Usuario with dpi=${dpi}. Maybe Usuario was not found!`
        });
      } else res.send({ message: "Usuario was updated successfully." });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message: "Error updating Usuario with dpi=" + dpi
      });
    });
};

// Delete a Usuario with the specified dpi in the request
exports.delete = (req, res) => {
  const dpi = req.params.dpi;

  Usuario.deleteMany({ dpi: dpi })
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

// Obtener todos los usuarios de la bd
exports.getAll = (req, res) => {
  Usuario.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error al retornar todos los usuarios en la BD" })
    });
};