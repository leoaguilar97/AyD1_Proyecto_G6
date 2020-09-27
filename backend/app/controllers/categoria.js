const db = require("../models");
const Categoria = db.categoria;

// Crear y guardar una categoria
exports.create = (req, res) => {
    if (!req.body.nombre) {
        return res.status(400).send({ message: "Se enviaron datos incompletos" });
    }

    let categoria = new Categoria({
        nombre: req.body.nombre,
    });

    // Save categoria in the database
    categoria
        .save(categoria)
        .then(data => {
            res.send({ message: "created", categoria: data });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Existio un error al agregar la categoria."
            });
        });
};

// Obtener todas las categorias de la base de datos
exports.getAll = (req, res) => {
    Categoria.find({})
        .then(data => {
            res.send({ categorias: data, message: 'retrieved' });
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error al retornar todas las cateorias en la BD" })
        });
};

// Obtiene una bodega de la base de datos
exports.find = (req, res) => {
    const consulta = req.params.consulta;
    Categoria.find({
            $or: [{
                nombre: {
                    $regex: consulta,
                    $options: "i"
                }
            }]
        }, function(err, data) {
            if (err) {
                res
                    .status(500)
                    .json({ message: "Error al obtener la categoria " + consulta });
            } else {
                if (data.length == 0) {
                    res.status(404).json({ message: 'No existe' });
                } else {
                    res.send({ categorias: data, message: 'retrieved' });
                }
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "Error retrieving Producto with  nombre=" + consulta });
        });
};

// Modifica una categoria a partir de su nombre
exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Los datos a modificar no pueden ser vacios"
        });
    }

    const nombre = req.params.nombre;

    Categoria.findOneAndUpdate({ nombre: nombre }, req.body, { useFindAndModify: false, new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `La categoria ${nombre} No existe`
                });
            } else
                res.send({ message: 'modified', categoria: data });
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error al modificar la categoria' + nombre
            });
        });
};

// Elimina una categoria a partir de su nombre
exports.delete = (req, res) => {
    const nombre = req.params.nombre;

    Categoria.findOneAndRemove({ nombre: nombre })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `La categoria ${nombre} No existe`
                });
            } else {
                res.send({
                    message: 'deleted'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `No se pudo eliminar la categoria ${nombre} ${err}`
            });
        });
};