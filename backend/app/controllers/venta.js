const db = require("../models");
const Venta = db.venta;
const Bodega = db.bodega;
const Vendedor = db.usuario;

exports.dbVenta = db.venta;

// Crear una venta
exports.create = async(req, res) => {

    if (!req.body.nombre_cliente || !req.body.vendedor || !req.body.productos || !req.body.bodega) {
        return res.status(400).send({ message: "Se enviaron datos incompletos", status: 'error' });
    }

    const venta = {
        nombre_cliente: req.body.nombre_cliente,
        nit: req.body.nit,
        direccion: req.body.direccion,
        vendedor: req.body.vendedor,
        productos: req.body.productos,
        bodega: req.body.bodega,
        total: 0
    };

    let vendedor;
    await Vendedor.findOne({ dpi: venta.vendedor }).then(data => {
        vendedor = data
    });

    if (!vendedor) {
        return res.status(400).send({ message: `El vendedor ${venta.vendedor} no existe`, status: 'error' });
    }

    venta.vendedor = vendedor.id;

    let bodega;
    await Bodega.findOne({
            _id: venta.bodega
        })
        .populate("productos.producto")
        .then(data => {
            bodega = data;
        });

    if (!bodega) {
        return res.status(400).send({ message: `La bodega ${venta.bodega} no existe`, status: 'error' });
    }

    // Validar productos
    let productos = bodega.productos.map(p => { return { producto: "" + p.producto._id, cantidad: p.cantidad, precio: p.precio } });

    // Revisar que todos los productos esten en la bodega

    let productos_ids = productos.map(p => { return p.producto });

    let message;

    let todosEnBodega = venta.productos.reduce((accumulator, currentValue) => {
        currentValue.cantidad = currentValue.cantidad * 1;
        let pindex = productos_ids.indexOf(currentValue.producto);
        let existeEnBodega = pindex > -1;
        let haySuficientes = !existeEnBodega ? false : currentValue.cantidad >= 0 && currentValue.cantidad <= productos[pindex].cantidad;
        let valido = existeEnBodega && haySuficientes;

        if (haySuficientes) {
            productos[pindex].cantidad -= currentValue.cantidad;
            venta.total += currentValue.cantidad * ((productos[pindex].precio * 1) || 0);
            console.log(venta.total);
        }

        if (!message && !valido) {
            if (!existeEnBodega) {
                message = `El producto ${currentValue.producto} no existe en la bodega ${bodega.nombre}`;
            } else if (!haySuficientes) {
                message = `No hay suficientes unidades del producto ${currentValue.producto}, se desean ${currentValue.cantidad} pero en la bodega solo hay ${productos[pindex].cantidad}`;
            }
        }

        return accumulator && existeEnBodega && haySuficientes;

    }, true);

    if (!todosEnBodega) {
        return res.status(400).send({ message: message, status: 'error' });
    }

    bodega.productos = productos;
    await bodega.save((err, data) => {
        if (err) {
            return res.status(500).send({ message: `Hubo un error guardando los datos de la bodega, intente de nuevo.`, status: 'error' });
        }
        bodega = data;
    });

    // Guardar venta
    Venta
        .create(venta)
        .then(data => {
            return res.status(201).send({ message: "Venta realizada correctamente", venta: data, bodega: bodega });
        })
        .catch(err => {
            return res.status(500).send({
                message: err.message || "Existio un error al agregar la venta."
            });
        });
};

exports.getAll = (req, res) => {
    Venta
        .find({})
        .populate({
            path: "bodega",
            select: ['nombre', 'direccion']
        })
        .populate({
            path: "vendedor",
            select: ['nombre', 'apellido', 'dpi', 'direccion', 'correo', 'fechaNacimiento']
        })
        //.populate("productos.producto")
        .populate({
            path: 'productos.producto',
            populate: {
                path: 'categorias',
                select: ['nombre']
            },
            select: ['nombre', 'categorias', 'precio', 'createdAt']
        })
        .then(data => {
            return res.send({ ventas: data, message: 'retrieved' });
        })
        .catch(err => {
            console.log(err);
            return res
                .status(500)
                .send({ message: "Error al retornar todos los productos en la BD" })
        });
};

exports.deleteAll = (_req, res) => {
    Venta.deleteMany({})
        .then(data => {
            res.send({
                message: 'deleted'
            });
        })
        .catch(err => {
            res.status(500).send({
                message: `No se elimino el historial de ventas`,
                error: err
            });
        });
};