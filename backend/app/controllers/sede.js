const db = require("../models");
const Sede = db.sede;

// Crear y guardar una sede
exports.create = (req, res) => {

    if (!req.body.nombre||!req.body.direccion||!req.body.municipio||!req.body.departamento||!req.body.encargado) {
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

// Obtener todas las sedes de la base de datos
exports.getAll = (req, res) => {
    Sede.find({})
        .then(data => {
            res.send({ sedes: data, message: 'retrieved' });
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error al retornar todas las sedes en la BD" })
        });
};

// Obtiene una sede de la base de datos
exports.findOne = (req, res) => {
    const codigo = req.params.codigo;

    Sede.findOne({ _id: codigo }, function (err, data) {
        if (err) {
            res
                .status(500)
                .json({ message: "Error al obtener la sede " + codigo });
        } else {
            if (!data) {
                res.status(404).json({ message: 'No existe'});
            } else {
                res.json({ message: 'retrieved', sede: data }).send();
            }
        }
    })
        .catch(err => {
            res
                .status(500)
                .json({ message: "Error retrieving sede with codigo=" + codigo });
        });
};


// Modifica una sede a partir de su codigo
exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Los datos a modificar no pueden ser vacios"
        });
    }

    const codigo = req.params.codigo;

    Sede.findOneAndUpdate({ _id: codigo }, req.body, { useFindAndModify: false, new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `La sede ${codigo} No existe`
                });
            } 
            else 
                res.send({ message: 'modified', sede: data });
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error al modificar la sede' + codigo
            });
        });
};