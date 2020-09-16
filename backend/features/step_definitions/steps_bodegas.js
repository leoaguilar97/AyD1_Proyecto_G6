const { Given, When, Then } = require('cucumber');
const faker = require('faker');
faker.setLocale('es_MX');

const got = require('got');
const hj = require('hamjest');

process.env.TESTING = true;

const app = require('../../index');

const Bodegas = require('../../app/models/bodega');
const { timeout } = require('../../index');

let body;

let bodega = {
    "nombre": "Departamento de " + faker.commerce.department(),
    "direccion": faker.address.streetAddress(),
};

When('se hace un http post a {string}, con informacion de la bodega [nombre, direccion]', async function (route) {

    var data = {
        headers: { 'Content-Type': 'application/json' },
        json: bodega,
        responseType: 'json'
    };

    const result = (await got.post(route, data));

    body = result.body;

    hj.assertThat(result.statusCode, hj.equalTo(200));
    hj.assertThat(body.message, hj.equalTo('created'));
});

Then('la bodega es guardada en la base de datos', async function () {
    hj.assertThat(body, hj.hasProperty('bodega'));
    hj.assertThat(body.bodega, hj.hasProperty('nombre'));
    hj.assertThat(body.bodega, hj.hasProperty('direccion'));
});

Then('se asigna un identificador unico a la bodega.', function () {
    hj.assertThat(body.bodega, hj.hasProperty('id'));
    hj.assertThat(body.bodega.id, hj.hasSize(24));
    hj.assertThat(body.bodega.id, hj.is(hj.string()));

    bodega.id = body.bodega.id;
});

When('se envian datos incompletos a {string}', async function (route) {
    let bodega = {
        "nombre": "Departamento de " + faker.commerce.department()
        // hace falta la direccion de la bodega
    };
    let code;

    var data = {
        headers: { 'Content-Type': 'application/json' },
        json: bodega,
        responseType: 'json',
        hooks: {
            beforeError: [
                error => {
                    const { response } = error;
                    if (response && response.body) {
                        error.message = `${response.body.message} (${response.statusCode})`;
                    }

                    body = response.body;
                    code = response.statusCode;

                    return { body: response.body, code: code };
                }
            ]
        }
    };

    try {
        await got.post(route, data);
    }
    catch (error) { /* ERROR ESPERADO */ }
    hj.assertThat(code, hj.equalTo(400));
});

Then('retorna un error.', function () {
    hj.assertThat(body.message, hj.equalTo('Se enviaron datos incompletos'));
});

When('se hace un http get a {string}', async function (route) {
    const result = (await got.get(route, { responseType: 'json' }));
    body = result.body;

    hj.assertThat(result.statusCode, hj.equalTo(200));
    hj.assertThat(body.message, hj.equalTo('retrieved'));
});

Then('las bodegas son retornadas en forma de lista.', function () {
    hj.assertThat(body.bodegas, hj.is(hj.array()));
});

When('se hace un http get a {string} y se envia como parametro :id un identificador de bodega', async function (route) {
    const result = (await got.get(route.replace(':id', bodega.id), { responseType: 'json' }));

    body = result.body;

    hj.assertThat(result.statusCode, hj.equalTo(200));
    hj.assertThat(body.message, hj.equalTo('retrieved'));
});

Then('la bodega es retornada en forma de objeto', function () {
    hj.assertThat(body.bodega, hj.hasProperty('nombre'));
    hj.assertThat(body.bodega, hj.hasProperty('direccion'));

    hj.assertThat(body.bodega.nombre, hj.equalTo(bodega.nombre));
    hj.assertThat(body.bodega.direccion, hj.equalTo(bodega.direccion));
    hj.assertThat(body.bodega.id, hj.equalTo(bodega.id));
});

When('se hace un http put a {string} y se envía como parámetro :id un identificador de bodega y se envian datos nuevos de la bodega [nombre o direccion]', async function (route) {

    bodega.nombre = "Departamento de " + faker.commerce.department();
    bodega.direccion = faker.address.streetAddress();

    var data = {
        headers: { 'Content-Type': 'application/json' },
        json: bodega,
        responseType: 'json'
    };

    const result = (await got.put(route.replace(':id', bodega.id), data));

    body = result.body;

    hj.assertThat(result.statusCode, hj.equalTo(200));
});

Then('la bodega es modificada exitosamente', function () {
    hj.assertThat(body.message, hj.equalTo('modified'));
});

Then('retornada en forma de objeto con los datos modificados', function () {
    hj.assertThat(body.bodega.nombre, hj.equalTo(bodega.nombre));
    hj.assertThat(body.bodega.direccion, hj.equalTo(bodega.direccion));
    hj.assertThat(body.bodega.id, hj.equalTo(bodega.id));
});

