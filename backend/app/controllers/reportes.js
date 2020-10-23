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

exports.vendedores = async(req, res) => {
    let reportData = [];
    var request = {
        send: (data) => {
            reportData = data;
        }
    };

    request.status = () => { return request }

    await controllerVenta.getVentas(request);
    var listaVendedores = [];
    reportData.ventas.forEach(venta => {
        let NoExisteProducto = true;
        listaVendedores.forEach(dato => {
            if (dato.nombre == `${venta.vendedor.nombre} ${venta.vendedor.apellido}`) {
                NoExisteProducto = false
                dato.cantidad += venta.total
            }
        });
        if (NoExisteProducto) {
            listaVendedores.push({ nombre: `${venta.vendedor.nombre} ${venta.vendedor.apellido}`, cantidad: venta.total });
        }
    });
    return res.status(200).send({ data: listaVendedores, message: 'retrieved', });
};

exports.dias = async(req, res) => {
    if (!req.params.dia) {
        return res.status(400).send({ message: 'Error, no se envio el dia', });
    }
    let reportData = [];
    var request = {
        send: (data) => {
            reportData = data;
        }
    };

    let dia = req.params.dia

    request.status = () => { return request }

    await controllerVenta.getVentas(request);
    var ventas = [];
    reportData.ventas.forEach(venta => {
        let fecha = venta.createdAt.toLocaleDateString("es-ES", dia);
        if (fecha == dia) {
            ventas.push(venta.total)
        }
    });
    return res.status(200).send({ data: ventas, message: 'retrieved', });
};