const { Given, When, Then, After } = require('cucumber');
const faker = require('faker');
faker.setLocale('es_MX');

const got = require('got');
const chai = require('chai');

const { expect } = chai;

process.env.TESTING = true;

let loadData = true;

const bodegas = [];
const productos = [];
const vendedores = [];
const clientes = [];

Given('la bodega', function(dataTable) {
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

Given('tiene en stock los siguientes productos', function(dataTable) {
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

Given('el vendedor a cargo de las ventas de la bodega es', function(dataTable) {
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

Given('atendera a un cliente, con los siguientes datos', function(dataTable) {

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

    console.log("Bodegas: ");
    console.table(bodegas);

    console.log("Productos: ");
    console.table(productos);

    console.log("Vendedores: ");
    console.table(vendedores);

    console.log("Clientes: ");
    console.table(clientes);
});


/* Espera que el data table tenga el siguiente formato y que tengan encabezado
    | Producto | Cantidad comprada  | IdProducto
*/
function procesarProductosCompra(dataTable) {
    let productosCompra = [];

    dataTable.rawTable.forEach((pc, index) => {
        if (index > 0) {
            productosCompra.push({
                producto: pc[0],
                cantidad: pc[1],
                id: pc[2]
            });
        }
    });

    return productosCompra;
}

When('el cliente realiza la siguiente compra', async function(dataTable) {

    const productosCompra = procesarProductosCompra(dataTable);
    console.log("Productos a comprar: ");
    console.log(productosCompra);

});

Then('el vendedor realiza un ticket de venta', async function() {

    return 'pending';
});

Then('se asigna la fecha de hoy, un código único y el total de la compra.', async function() {

    return 'pending';
});