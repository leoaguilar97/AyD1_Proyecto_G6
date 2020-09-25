const db = require("../models");
const Sede = db.sede;

// Crear y guardar una sede
exports.create = (req, res) => {

    if (!req.body.nombre || !req.body.direccion || !req.body.municipio || !req.body.departamento || !req.body.encargado) {
        return res.status(400).send({ message: "Se enviaron datos incompletos" });
    }

    let sede = new Sede({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        municipio : req.body.municipio,
        departamento : req.body.departamento,
        encargado : req.body.encargado
    });

    // guarda la sede en la base de datos
    sede
        .save(sede)
        .then(data => {
            res.send({ message: "created", sede: data });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Existio un error al agregar la sede."
            });
        });
};