const { Given, When, Then, After, Before } = require('cucumber');
const faker = require('faker');
faker.setLocale('es_MX');

const got = require('got');
const chai = require('chai');
const sinon = require('sinon');
const ventas = require('../../app/controllers/venta');
const create = ventas.create;
const dbVenta = ventas.dbVenta;

const { expect } = chai;

process.env.TESTING = true;

let loadData = true;

const bodegas = [];
const productos = [];
const vendedores = [];
const clientes = [];

var sandbox;

function procesarProductosCompra(dataTable) {
    let productosCompra = [];

    dataTable.rawTable.forEach((pc, index) => {
        if (index > 0) {
            productosCompra.push({
                //producto: pc[0],
                cantidad: 0,
                producto: pc[2]
            });
        }
    });

    return productosCompra;
}

let venta = {};

Before(function () {
    sandbox = sinon.createSandbox();
});

After(function () {
    sandbox.restore();
});

Given('la bodega', function (dataTable) {
    if (loadData) {
        dataTable.rawTable.forEach((bodega, index) => {
            if (index > 0) {
                bodegas.push({
                    nombre: bodega[0],
                    id: bodega[1]
                });
            }
        });
    }
});

Given('tiene en stock los siguientes productos', function (dataTable) {
    if (loadData) {
        dataTable.rawTable.forEach((producto, index) => {
            if (index > 0) {
                productos.push({
                    nombre: producto[0],
                    cantidad: producto[1],
                    precio: producto[2],
                    id: producto[3]
                });
            }
        });
    }
});

Given('el vendedor a cargo de las ventas de la bodega es', function (dataTable) {
    if (loadData) {
        dataTable.rawTable.forEach((vendedor, index) => {
            if (index > 0) {
                vendedores.push({
                    nombre: vendedor[0],
                    correo: vendedor[1],
                    id: vendedor[2]
                });
            }
        });
    }
});

Given('atendera a un cliente, con los siguientes datos', function (dataTable) {

    if (loadData) {
        dataTable.rawTable.forEach((cliente, index) => {
            if (index > 0) {
                clientes.push({
                    nombre: cliente[0],
                    direccion: cliente[1],
                    nit: cliente[2]
                });
            }
        });

        loadData = false;
    }
});

When('el cliente realiza la siguiente compra', async function (dataTable) {
    venta.nombre_cliente = clientes[0].nombre;
    venta.nit = clientes[0].nit;
    venta.direccion = clientes[0].direccion;
    venta.vendedor = vendedores[0].id;
    venta.productos = procesarProductosCompra(dataTable);
    venta.bodega = bodegas[0].id;
});

Then('el vendedor realiza un ticket de venta y es guardada exitosamente', function (done) {

    let res = {
        send: () => { },
        status: sinon.stub().returnsThis()
    };

    const mock = sinon.mock(res);
    mock.expects("send").once();

    sandbox.stub(dbVenta, 'create').returns({
        then: (cb) => {
            cb({});

            mock.verify();

            expect(res.status.calledOnce).to.be.true;
            expect(res.status.firstCall.calledWithExactly(201)).to.be.true;

            done();

            return { catch: () => { } }
        },
    });

    create({ body: venta }, res);
});

When('el cliente intenta realizar la siguiente compra', function (dataTable) {
    venta.nombre_cliente = clientes[0].nombre;
    venta.nit = clientes[0].nit;
    venta.direccion = clientes[0].direccion;
    venta.vendedor = vendedores[0].id;
    venta.productos = procesarProductosCompra(dataTable);
    venta.bodega = bodegas[0].id;
});

Then('el vendedor le comenta al cliente que no es posible realizar su compra', function () {
    let res = {
        send: () => {},
        status: () => { return { send: () => {}}}
    }
    sandbox.restore();
    sandbox.stub(ventas, "create").returns({
        after: (cb) => {
            cb({});

            mock.verify();

            expect(res.status.calledOnce).to.be.true;
            expect(res.status.firstCall.calledWithExactly(400)).to.be.true;

            done();

            return { catch: () => { } }
        },
        then: () => { return { catch: () => {}}}
    });

    create({ body: venta }, res);
});

Then('cancela la venta debido a falta de unidades en la bodega', function () {
    let res = {
        send: () => {},
        status: () => { return { send: () => {}}}
    }
    sandbox.restore();
    sandbox.stub(ventas, "create").returns({
        after: (cb) => {
            cb({});

            mock.verify();

            expect(res.status.calledOnce).to.be.true;
            expect(res.status.firstCall.calledWithExactly(400)).to.be.true;
            expect(res.message).to.equal("No hay suficientes unidades en la bodega");

            done();

            return { catch: () => { } }
        },
        then: () => { return { catch: () => {}}}
    });

    create({ body: venta }, res);
});

When('el cliente intenta realizar otra compra', function (dataTable) {
    venta.nombre_cliente = clientes[0].nombre;
    venta.nit = clientes[0].nit;
    venta.direccion = clientes[0].direccion;
    venta.vendedor = vendedores[0].id;
    venta.productos = procesarProductosCompra(dataTable);
    venta.bodega = bodegas[0].id;
});

Then('cancela la venta debido a que no hay atun en la bodega', function () {
    let res = {
        send: () => {},
        status: () => { return { send: () => {}}}
    }
    sandbox.restore();
    sandbox.stub(ventas, "create").returns({
        after: (cb) => {
            cb({});

            mock.verify();

            expect(res.status.calledOnce).to.be.true;
            expect(res.status.firstCall.calledWithExactly(400)).to.be.true;
            expect(res.message).to.equal("El producto Atun no existe en la bodega");

            done();

            return { catch: () => { } }
        },
        then: () => { return { catch: () => {}}}
    });

    create({ body: venta }, res);
});