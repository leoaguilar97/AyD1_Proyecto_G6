const db = require("../models");
const Bodega = db.bodega;

// Create and Save a new bodega
exports.create = (req, res) => {

    if (!req.body.nombre || !req.body.direccion){
        return res.status(400).send({ message: "Se enviaron datos incompletos"});
    }

    let bodega = new Bodega({
        nombre: req.body.nombre,
        direccion: req.body.direccion
    });

    // Save producto in the database
    bodega
        .save(bodega)
        .then(data => {
            res.send({message: "created", bodega: data });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Existio un error al agregar la bodega."
            });
        });
};
