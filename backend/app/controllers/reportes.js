const db = require("../models");
const controllerVenta = require("../controllers/venta");
const producto = require("../models/producto");
const Venta = db.venta;

exports.Venta = Venta;

exports.categorias = async (req, res) => {
    if (!req.body.grafica) {
        return res.status(400).send({ message: 'Error, no se envio el tipo de grafica', });
    }
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

    if (req.body.grafica.toLowerCase() == "pie") {
        let totalVentas = 0;

        listaCategoria.forEach(categoria => {
            totalVentas += categoria.cantidad
        })

        listaCategoria.forEach(categoria => {
            categoria.cantidad = (categoria.cantidad / totalVentas) * 100
        })
    }
    return res.status(200).send({ data: listaCategoria, message: 'retrieved', });
};

exports.productos = async (req, res) => {
    if (!req.body.grafica) {
        return res.status(400).send({ message: 'Error, no se envio el tipo de grafica', });
    }
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


    if (req.body.grafica.toLowerCase() == "pie") {
        let totalVentas = 0;

        listaProducto.forEach(producto => {
            totalVentas += producto.cantidad
        })

        listaProducto.forEach(producto => {
            producto.cantidad = (producto.cantidad / totalVentas) * 100
        })
    }

    return res.status(200).send({ data: listaProducto, message: 'retrieved', });
};

exports.vendedores = async (req, res) => {
    if (!req.body.grafica) {
        return res.status(400).send({ message: 'Error, no se envio el tipo de grafica', });
    }
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


    if (req.body.grafica.toLowerCase() == "pie") {
        let totalVentas = 0;

        listaVendedores.forEach(producto => {
            totalVentas += producto.cantidad
        })

        listaVendedores.forEach(producto => {
            producto.cantidad = (producto.cantidad / totalVentas) * 100
        })
    }

    return res.status(200).send({ data: listaVendedores, message: 'retrieved', });
};

exports.dias = async (req, res) => {
    if (!req.body.grafica || !req.body.dia) {
        return res.status(400).send({ message: 'Error, no se enviaron los datos necezarios', });
    }

    let reportData = [];
    var request = {
        send: (data) => {
            reportData = data;
        }
    };

    let dia = new Date(req.body.dia)

    request.status = () => { return request }

    await controllerVenta.getVentas(request);
    var ventas = [];
    let cont = 1;
    reportData.ventas.forEach(venta => {
        let fecha = venta.createdAt;
        if (fecha.getDate() == dia.getDate() &&
            fecha.getMonth() == dia.getMonth() ) {
            ventas.push({ total: venta.total, venta: cont })
            cont++;
        }
    });


    if (req.body.grafica.toLowerCase() == "pie") {
        let totalVentas = 0;

        ventas.forEach(producto => {
            totalVentas += producto.total
        })

        ventas.forEach(producto => {
            producto.total = (producto.total / totalVentas) * 100
        })
    }
    return res.status(200).send({ data: ventas, message: 'retrieved', });
};

exports.mes = async (req, res) => {
    if (!req.body.grafica || !req.body.mes) {
        return res.status(400).send({ message: 'Error, no se enviaron los datos necezarios', });
    }

    let reportData = [];
    var request = {
        send: (data) => {
            reportData = data;
        }
    };

    let mes = new Date(req.body.mes+"-10")

    request.status = () => { return request }

    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    await controllerVenta.getVentas(request);
    var ventas = [];
    reportData.ventas.forEach(venta => {
        let fecha = venta.createdAt;
        let exsteDia = true
        ventas.forEach(dia => {
            if (dia.dia == fecha.getDate()+1) {
                exsteDia = false
                dia.total += venta.total;
            }
        })

        if (fecha.getMonth() == mes.getMonth() && 
        fecha.getYear() ==  mes.getYear() && exsteDia) {
            ventas.push({ dia: fecha.getDate()+1, total: venta.total })
        }
    });


    if (req.body.grafica.toLowerCase() == "pie") {
        let totalVentas = 0;

        ventas.forEach(producto => {
            totalVentas += producto.total
        })

        ventas.forEach(producto => {
            producto.total = (producto.total / totalVentas) * 100
        })
    }
    return res.status(200).send({ data: ventas, message: 'retrieved', });
};

exports.ano = async (req, res) => {
    if (!req.body.grafica || !req.body.ano) {
        return res.status(400).send({ message: 'Error, no se enviaron los datos necezarios', });
    } reportData = [];
    var request = {
        send: (data) => {
            reportData = data;
        }
    };

    let ano = req.body.ano

    request.status = () => { return request }

    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    await controllerVenta.getVentas(request);
    var ventas = [];
    reportData.ventas.forEach(venta => {
        let fecha = venta.createdAt.toLocaleDateString("es-ES", options);
        let exsteMes = true
        ventas.forEach(mes => {
            if (mes.mes.split("-")[0] == fecha.split("-")[0] &&
                mes.mes.split("-")[1] == fecha.split("-")[1]) {
                exsteMes = false
                mes.total += venta.total;
            }
        })

        if (fecha.includes(ano) && exsteMes) {
            ventas.push({ mes: obtenerMes(fecha.split("-")[1]), total: venta.total })
        }
    });

    if (req.body.grafica.toLowerCase() == "pie") {
        let totalVentas = 0;

        ventas.forEach(ventas => {
            totalVentas += ventas.total
        })

        ventas.forEach(mes => {
            mes.total = (mes.total / totalVentas) * 100
        })
    }
    return res.status(200).send({ data: ventas, message: 'retrieved', });
};


function obtenerMes(mes) {
    switch (mes) {
        case "1":
            return "Enero"
        case "2":
            return "Febrero"
        case "3":
            return "Marzo"
        case "4":
            return "Abril"
        case "5":
            return "Mayo"
        case "6":
            return "Junio"
        case "7":
            return "Julio"
        case "8":
            return "Agosto"
        case "9":
            return "Septiembre"
        case "10":
            return "Octubre"
        case "11":
            return "Noviembre"
        case "12":
            return "Diciembre"
    }

    return "enero"
}






