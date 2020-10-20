const { Given, When, Then, After } = require('cucumber');
const faker = require('faker');
faker.setLocale('es_MX');

const got = require('got');
const chai = require('chai');

const { expect } = chai;

process.env.TESTING = true;

Given('la bodega', function(dataTable) {



    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Given('tiene en stock los siguientes productos', function(dataTable) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Given('el vendedor a cargo de las ventas de la bodega es', function(dataTable) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Given('atendera a un cliente, con los siguientes datos', function(dataTable) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Given('Atiende a un cliente, con los siguientes datos', async function(tbl) {});

When('el cliente realiza la siguiente compra', async function(dataTable) {

    return 'pending';
});

Then('el vendedor realiza un ticket de venta', async function() {

    return 'pending';
});

Then('se asigna la fecha de hoy, un código único y el total de la compra.', async function() {

    return 'pending';
});