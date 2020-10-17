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

let ip = "http://localhost"
let port = process.env.PORT || 5000;

let uri = `${ip}:${port}`;


let sede = {
    "nombre": "Sede " + faker.commerce.productName(),
    "direccion": faker.address.streetAddress(),
    "municipio" : faker.address.city(),
    "departamento" :faker.address.state(),
    "encargado": faker.name.firstName(),
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
        json: sede,
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

When('se hace un http post a {string}, con informacion de la sede [nombre, direccion, municipio, departamento, encargado]', async function (route) {
    await got.post(uri + route, postData());
    hj.assertThat(statusCode, hj.equalTo(200));
    hj.assertThat(message, hj.equalTo('created'));
});

Then('la sede es guardada en la base de datos', async function () {
    hj.assertThat(body, hj.hasProperty('sede'));
    hj.assertThat(body.sede, hj.hasProperty('nombre'));
    hj.assertThat(body.sede, hj.hasProperty('direccion'));
    hj.assertThat(body.sede, hj.hasProperty('municipio'));
    hj.assertThat(body.sede, hj.hasProperty('departamento'));
    hj.assertThat(body.sede, hj.hasProperty('encargado'));
});

Then('se asigna un identificador unico a la sede.', function () {
    hj.assertThat(body.sede, hj.hasProperty('id'));
    hj.assertThat(body.sede.id, hj.hasSize(24));
    hj.assertThat(body.sede.id, hj.is(hj.string()));

    sede.id = body.sede.id;
});

When('se envian datos incompletos de sede a {string}', async function (route) {
    let toPost = postData();
    toPost.json = {
        // hace el encargado de la sede
    };

    try {
        await got.post(uri + route, toPost);
    }
    catch (error) { /* ERROR ESPERADO */ }

    hj.assertThat(statusCode, hj.equalTo(400));
});

Then('retorna un error en las sedes.', function () {

    hj.assertThat(message, hj.equalTo('Se enviaron datos incompletos'));
    
});



When('se hace un http get para obtener las sedes a {string}', async function (route) {
    await got.get(uri + route, { responseType: 'json', hooks: { afterResponse: hooks.afterResponse } });
    hj.assertThat(statusCode, hj.equalTo(200));
    hj.assertThat(message, hj.equalTo('retrieved'));
});

Then('las sedes registradas son retornadas en forma de lista.', function () {
    hj.assertThat(body.sedes, hj.is(hj.array()));
});


When('se hace un http get a {string} y se envia como parametro :id un identificador de sede', async function (route) {
    await got.get(uri + route.replace(':id', sede.id), getData());

    hj.assertThat(statusCode, hj.equalTo(200));
    hj.assertThat(message, hj.equalTo('retrieved'));
});

Then('la sede es retornada en forma de objeto.', function () {
    hj.assertThat(body.sede, hj.hasProperty('nombre'));
    hj.assertThat(body.sede, hj.hasProperty('direccion'));
    hj.assertThat(body.sede, hj.hasProperty('municipio'));
    hj.assertThat(body.sede, hj.hasProperty('departamento'));
    hj.assertThat(body.sede, hj.hasProperty('encargado'));

    hj.assertThat(body.sede.nombre, hj.equalTo(sede.nombre));
    hj.assertThat(body.sede.direccion, hj.equalTo(sede.direccion));
    hj.assertThat(body.sede.municipio, hj.equalTo(sede.municipio));
    hj.assertThat(body.sede.departamento, hj.equalTo(sede.departamento));
    hj.assertThat(body.sede.encargado, hj.equalTo(sede.encargado));
    hj.assertThat(body.sede.id, hj.equalTo(sede.id));
});


When('se hace un http get a {string} y se envia como parametro :id un identificador de sede que no existe', async function (route) {
    try {
        await got.get(uri + route.replace(":id", "000000000000"), getData());
    }
    catch (ex) { }

    hj.assertThat(message, hj.containsString('No existe'));
});



When('se hace un http put a {string} y se envía como parámetro :id un identificador de sede y se envian datos nuevos de la sede [nombre o direccion o municipio o departamento o encargado]', async function (route) {
    sede.nombre = "Sede" + faker.commerce.productName();
    sede.direccion = faker.address.streetAddress();
    sede.municipio = faker.address.city();
    sede.departamento = faker.address.state();
    sede.encargado = faker.name.firstName();


    await got.put(uri + route.replace(':id', sede.id), postData());

    hj.assertThat(statusCode, hj.equalTo(200));
});

Then('la sede es modificada exitosamente', function () {
    hj.assertThat(message, hj.equalTo('modified'));
});

Then('retornada la sede en forma de objeto con los datos modificados', function () {
    hj.assertThat(body.sede.nombre, hj.equalTo(sede.nombre));
    hj.assertThat(body.sede.direccion, hj.equalTo(sede.direccion));
    hj.assertThat(body.sede.municipio, hj.equalTo(sede.municipio));
    hj.assertThat(body.sede.departamento, hj.equalTo(sede.departamento));
    hj.assertThat(body.sede.encargado, hj.equalTo(sede.encargado));
    hj.assertThat(body.sede.id, hj.equalTo(sede.id));
});


When('se hace un http put a {string} y se envía como parámetro :id un identificador de sede que no existe', async function (route) {
    try {
        await got.get(uri + route.replace(":id", "000000000000"), getData());
    }
    catch (ex) { }

    hj.assertThat(message, hj.containsString('No existe'));
});



When('se hace un http delete a {string} y se envía como parámetro :id un identificador de sede', async function (route) {
    await got.delete(uri + route.replace(':id', sede.id), postData());

    hj.assertThat(statusCode, hj.equalTo(200));
});

Then('la sede es eliminada de la base de datos', function () {
    hj.assertThat(message, hj.equalTo('deleted'));
});


When('se hace un http delete a {string} y se envía como parámetro :id un identificador de sede que no existe', async function (route) {
    try {
        await got.get(uri + route.replace(":id", "000000000000"), getData());
    }
    catch (ex) { }

    hj.assertThat(message, hj.containsString('No existe'));
});

