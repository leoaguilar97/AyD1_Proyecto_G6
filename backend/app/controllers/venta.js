const db = require("../models");
const Venta = db.venta;

exports.dbVenta = db.venta;

// Crear una venta
exports.create = (req, res) => {

    if (!req.body.nombre_cliente || !req.body.vendedor || !req.body.productos || !req.body.bodega) {
        return res.status(400).send({ message: "Se enviaron datos incompletos" });
    }

    const venta = {
        nombre_cliente: req.body.nombre_cliente,
        nit: req.body.nit,
        direccion: req.body.direccion,
        vendedor: req.body.vendedor,
        productos: req.body.productos,
        bodega: req.body.bodega
    };

    Venta
        .create(venta)
        .then(data => {
            return res.status(201).send({ message: "created", venta: data });
        })
        .catch(err => {
            return res.status(500).send({
                message: err.message || "Existio un error al agregar la venta."
            });
        });
};