const { Given, When, Then } = require('cucumber');
const faker = require('faker');
faker.setLocale('es_MX');

const got = require('got');
const hj = require('hamjest');

process.env.TESTING = true;

// REQUERIR LA APP PARA INICIAR EL SERVER
require('../../index');

let body;
let statusCode;
let message;

let categoria = {
    "nombre": "lacteos de " + faker.commerce.department(),
};

let hooks = {
    afterResponse: [(response) => {
        body = response.body;
        statusCode = response.statusCode;
        message = body.message;
        return response;
    }],

    beforeError: [
        error => {
            const { response } = error;

            body = response.body;
            statusCode = response.statusCode;
            message = body.message;

            if (response && response.body) {
                error.message = `${message} (${statusCode})`;
            }

            return response;
        }
    ]
};

let postData = () => {
    return {
        headers: { 'Content-Type': 'application/json' },
        json: categoria,
        responseType: 'json',
        hooks: hooks
    }
};

let getData = () => {
    return {
        hooks: hooks,
        responseType: 'json'
    }
};

When('se hace un http post a {string}, con informacion de la categoria [nombre]', async function(route) {
    await got.post(route, postData());

    hj.assertThat(statusCode, hj.equalTo(200));
    hj.assertThat(message, hj.equalTo('created'));
});

Then('la categoria es guardada en la base de datos', async function() {
    hj.assertThat(body, hj.hasProperty('categoria'));
    hj.assertThat(body.categoria, hj.hasProperty('nombre'));
});

Then('se asigna un identificador unico a la categoria.', function() {
    hj.assertThat(body.categoria, hj.hasProperty('id'));
    hj.assertThat(body.categoria.id, hj.hasSize(24));
    hj.assertThat(body.categoria.id, hj.is(hj.string()));

    categoria.id = body.categoria.id;
});

When('se envian datos incompletos a la url {string}', async function(route) {
    let toPost = postData();
    toPost.json = {
        // hace falta el nombre de la categoria
    };

    try {
        await got.post(route, toPost);
    } catch (error) { /* ERROR ESPERADO */ }

    hj.assertThat(statusCode, hj.equalTo(400));
});

Then('retorna un error al intentar ingresar una categoria.', function() {
    hj.assertThat(message, hj.equalTo('Se enviaron datos incompletos'));
});

When('se hace un http get a categoria {string}', async function(route) {
    await got.get(route, { responseType: 'json', hooks: { afterResponse: hooks.afterResponse } });

    hj.assertThat(statusCode, hj.equalTo(200));
    hj.assertThat(message, hj.equalTo('retrieved'));
});

Then('las categorias son retornadas en forma de lista.', function() {
    hj.assertThat(body.categorias, hj.is(hj.array()));
});


When('se hace un http get a categoria {string} y se envia como parametro :consulta una expresion regular de categoria', async function(route) {
    await got.get(route.replace(':consulta', categoria.nombre), getData());

    hj.assertThat(statusCode, hj.equalTo(200));
    hj.assertThat(message, hj.equalTo('retrieved'));
});

Then('la categoria es retornada en forma de lista', function() {
    hj.assertThat(body.categorias, hj.is(hj.array()));
});

When('se hace un http get a categoria {string} y se envia como parametro :consulta una expresion regular de categoria que no existe', async function(route) {
    try {
        await got.get(route.replace(":consulta", "000000000000"), getData());
    } catch (ex) {}

    hj.assertThat(message, hj.containsString('No existe'));
});

When('se hace un http put a {string} y se envía como parámetro :nombre de una categoria y se envian el nuevo nombre para la categoria [nombre]', async function(route) {
    categoria.nombre = "lacteos de " + faker.commerce.department();

    await got.put(route.replace(':nombre', categoria.nombre), postData());

    hj.assertThat(statusCode, hj.equalTo(200));
});

Then('la categoria es modificada exitosamente', function() {
    hj.assertThat(message, hj.equalTo('modified'));
});

Then('retornada en forma de objeto con los datos modificados de categoria', function() {
    hj.assertThat(body.categoria.nombre, hj.equalTo(categoria.nombre));
});

When('se hace un http put a {string} y se envía como parámetro :nombre una de categoria que no existe', async function(route) {
    try {
        await got.get(route.replace(":nombre", "000000000000"), getData());
    } catch (ex) {}

    hj.assertThat(message, hj.containsString('No existe'));
});

Then('devuelve un error {int} en categoria', function(code) {
    hj.assertThat(statusCode, hj.equalTo(code));
});

When('se hace un http delete a {string} y se envía como parámetro :nombre un identificador de categoria', async function(route) {
    await got.delete(route.replace(':nombre', categoria.nombre), postData());

    hj.assertThat(statusCode, hj.equalTo(200));
});

Then('la categoria es eliminada de la base de datos', function() {
    hj.assertThat(message, hj.equalTo('deleted'));
});

When('se hace un http delete a {string} y se envía como parámetro :nombre un identificador de categoria que no existe', async function(route) {
    try {
        await got.get(route.replace(":nombre", "000000000000"), getData());
    } catch (ex) {}

    hj.assertThat(message, hj.containsString('No existe'));
});