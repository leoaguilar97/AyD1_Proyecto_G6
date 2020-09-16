const db = require("../models");
const Bodega = db.bodega;

// Create and Save a new bodega
exports.create = (req, res) => {

    if (!req.body.nombre || !req.body.direccion) {
        return res.status(400).send({ message: "Se enviaron datos incompletos" });
    }

    let bodega = new Bodega({
        nombre: req.body.nombre,
        direccion: req.body.direccion
    });

    // Save producto in the database
    bodega
        .save(bodega)
        .then(data => {
            res.send({ message: "created", bodega: data });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Existio un error al agregar la bodega."
            });
        });
};

// Obtener todos los productos de la bd
exports.getAll = (req, res) => {
    Bodega.find({})
        .then(data => {
            res.send({ bodegas: data, message: 'retrieved' });
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error al retornar todos los productos en la BD" })
        });
};


// Find a single Bodega with an codigo
exports.findOne = (req, res) => {
    const codigo = req.params.codigo;

    Bodega.findOne({ _id: codigo }, function (err, data) {
        if (err) {
            res
                .status(500)
                .send({ message: "Error al obtener la bodega " + codigo });
        } else {
            if (!data) {
                res
                    .status(404)
                    .send({ message: "La bodega " + codigo + " no existe" });
            } else {
                res.json({ message: 'retrieved', bodega: data });
            }
        }
    })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Producto with codigo=" + codigo });
        });
};

// Update a bodega by the codigo in the request
exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Los datos a modificar no pueden ser vacios"
        });
    }

    const codigo = req.params.codigo;

    Bodega.findOneAndUpdate({ _id: codigo }, req.body, { useFindAndModify: false, new: true })
        .then(data => {
            
            if (!data) {
                res.status(404).send({
                    message: `La bodega ${codigo} no fue encontrada`
                });
            } else res.send({ message: 'modified', bodega: data });
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error al modificar la bodega' + codigo
            });
        });
};
