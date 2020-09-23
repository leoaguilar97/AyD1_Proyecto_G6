
const { Given, When, Then } = require('cucumber');
const faker = require('faker');
faker.setLocale('es_MX');

const got = require('got');
const hj = require('hamjest');

process.env.TESTING = true;

When('se registra un producto, realizando un http post a {string}, y se envia una lista de identificadores de categorias', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('se vinculan todas las categorias enviadas al producto registrado', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('se agrega a cada categoría enviada el producto creado.', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Given('un producto existente en la base de datos', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('se envia un objeto con el atributo {string} con un http put a {string}', function (string, string2) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('se vinculan todas las categorias enviadas al producto modificado', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('se agrega a cada categoría enviada el producto modificado.', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Given('una categoría existente en la base de datos', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('se elimina una categoría realizando una llamada http delete a {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('se eliminan todas las referencias a esa categoría en todos los productos vinculados a ella', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

