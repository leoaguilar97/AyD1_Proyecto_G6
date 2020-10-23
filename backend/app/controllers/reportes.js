const db = require("../models");
const controllerVenta = require("../controllers/venta");
const producto = require("../models/producto");
const Venta = db.venta;

exports.Venta = Venta;

exports.categorias = async(req, res) => {
    let reportData = [];
    var request = {
        send: (data) => {
            reportData = data;
        }
    };

    request.status = () => { return request }

    await controllerVenta.getVentas(request);

    var listaCategoria = [];
    reportData.ventas.forEach(venta => {
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
};


exports.productos = async(req, res) => {
    let reportData = [];
    var request = {
        send: (data) => {
            reportData = data;
        }
    };

    request.status = () => { return request }

    await controllerVenta.getVentas(request);
    var listaProducto = [];
    reportData.ventas.forEach(venta => {
        listaProd = [];

        venta.productos.forEach(producto => {
            NoExisteProducto = true;
            listaProd.push(producto.producto.nombre)
            listaProducto.forEach(dato => {
                if (dato.nombre == producto.producto.nombre) {
                    NoExisteProducto = false
                    dato.cantidad += producto.cantidad
                }
            })
            if (NoExisteProducto) {
                listaProducto.push({ nombre: producto.producto.nombre, cantidad: producto.cantidad });
            }
        });
    });

    let totalVentas = 0;

    listaProducto.forEach(producto => {
        totalVentas += producto.cantidad
    })

    listaProducto.forEach(producto => {
        producto.cantidad = (producto.cantidad / totalVentas) * 100
    })

    return res.status(200).send({ data: listaProducto, message: 'retrieved', });
};