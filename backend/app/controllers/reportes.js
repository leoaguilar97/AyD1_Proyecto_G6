const db = require("../models");
const controllerVenta = require("../controllers/venta	");
const Venta = db.venta;

exports.Venta = Venta;

exports.categorias = (req, res) => {
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
        .populate({
            path: 'productos.producto',
            populate: {
                path: 'categorias',
                select: ['nombre']
            },
            select: ['nombre', 'categorias', 'precio', 'createdAt']
        })
        .then(data => {
            var listaCategoria = [];
            data.forEach(venta => {
                venta.productos.forEach(producto => {
                    listaCat = [];

                    producto.producto.categorias.forEach(categoria => {
                        NoExisteCategogria = true;
                        listaCat.push(categoria.nombre)
                        listaCategoria.forEach(dato => {
                            if (dato.nombre == categoria.nombre) {
                                NoExisteCategogria = false;
                            }
                        })
                        if (NoExisteCategogria) {
                            listaCategoria.push({ nombre: categoria.nombre, cantidad: 0 });
                        }
                    })

                    listaCat.forEach(nombre => {
                        listaCategoria.forEach(categoria => {
                            if (nombre == categoria.nombre) {
                                categoria.cantidad += producto.cantidad
                            }
                        });
                    });
                });
            });

            let totalVentas = 0;

            listaCategoria.forEach(categoria => {
                totalVentas += categoria.cantidad
            })

            listaCategoria.forEach(categoria => {
                categoria.cantidad = (categoria.cantidad / totalVentas) * 100
            })

            return res.status(200).send({ data: listaCategoria, message: 'retrieved', });
        })
        .catch(err => {
            console.log(err);
            return res
                .status(500)
                .send({ message: "Error al retornar los datos." })
        });
};


exports.productos = (req, res) => {
    var res = {
        status: (code) => {
            stcode = code;
        },
        send: (data) => {
            reportData = data;
        }
    };
    await controllerVenta.ventas({}, res);

    return res.status(200).send({ data: res, message: 'retrieved', });

};