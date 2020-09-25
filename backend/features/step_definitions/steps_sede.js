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
    await got.post(route, postData());
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
        "nombre": "Sede " + faker.commerce.productName(),
        "direccion": faker.address.streetAddress(),
        "municipio" : faker.address.city(),
        "departamento" :faker.address.state()
        // hace el encargado de la sede
    };

    try {
        await got.post(route, toPost);
    }
    catch (error) { /* ERROR ESPERADO */ }

    hj.assertThat(statusCode, hj.equalTo(400));
});

Then('Entonces retorna un error de creacion.', function () {
    hj.assertThat(message, hj.equalTo('Se enviaron datos incompletos'));
});



