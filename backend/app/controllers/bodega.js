const db = require("../models");
const Bodega = db.bodega;

// Crear y guardar una bodega
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
                message: err.message || "Existio un error al agregar la bodega."
            });
        });
};

// Obtener todas las bodegas de la base de datos
exports.getAll = (req, res) => {
    Bodega.find({})
        .populate("productos.producto")
        .then(data => {
            res.send({ bodegas: data, message: 'retrieved' });
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error al retornar todos los productos en la BD" })
        });
};

// Obtiene una bodega de la base de datos
exports.findOne = (req, res) => {
    const codigo = req.params.codigo;
    Bodega
        .findOne({ _id: codigo })
        .populate("productos.producto")
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No existe' });
            } else {
                res.json({ message: 'retrieved', bodega: data }).send();
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "Error retrieving Producto with codigo=" + codigo });
        });
};

// Modifica una bodega a partir de su codigo
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
                return res.status(404).send({
                    message: `La bodega ${codigo} No existe`
                });
            } else
                res.send({ message: 'modified', bodega: data });
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error al modificar la bodega' + codigo
            });
        });
};

// Elimina una bodega a partir de su codigo
exports.delete = (req, res) => {
    const codigo = req.params.codigo;

    Bodega.findOneAndRemove({ _id: codigo })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `La bodega ${codigo} No existe`
                });
            } else {
                res.send({
                    message: 'deleted'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `No se pudo eliminar la bodega ${codigo} ${err}`
            });
        });
};


exports.insertProductos = (req, res) => {

    if (!req.body.productos || !req.body.bodega) {
        return res.status(400).send({ message: "Se enviaron datos incompletos" });
    }

    const codigo = req.body.bodega;

    Bodega.findOneAndUpdate({ _id: codigo }, { productos: req.body.productos }, { useFindAndModify: false, new: true })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `La bodega ${codigo} No existe`
                });
            } else
                res.send({ message: 'modified', bodega: data });
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error al modificar la bodega' + codigo
            });
        });
}