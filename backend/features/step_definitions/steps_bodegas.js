const { Given, When, Then } = require('cucumber');
const faker = require('faker');
faker.setLocale('es_MX');

const got = require('got');
const hj = require('hamjest');

const Bodegas = require('../../app/models/bodega');

let body;

When('Se hace un http post a {string}, con informacion de la bodega [nombre, direccion]', async function (route) {
    let bodega = {
        "nombre": "Departamento de " + faker.commerce.department(),
        "direccion": faker.address.streetAddress(),
    };

    var data = {
        headers: { 'Content-Type': 'application/json' },
        json: bodega,
        responseType: 'json'
    };

    const result = (await got.post(route, data));

    body = result.body;
    let code = result.statusCode;

    hj.assertThat(body.message, hj.equalTo('created'));
    hj.assertThat(code, hj.equalTo(200));
});

Then('La bodega es guardada en la base de datos', async function () {
    hj.assertThat(body, hj.hasProperty('bodega'));
    hj.assertThat(body.bodega, hj.hasProperty('nombre'));
    hj.assertThat(body.bodega, hj.hasProperty('direccion'));
});

Then('Se asigna un identificador unico a la bodega', function () {
    hj.assertThat(body.bodega, hj.hasProperty('id'));
    hj.assertThat(body.bodega.id, hj.hasSize(24));
    hj.assertThat(body.bodega.id, hj.is(hj.string()));
});

When('Se envian datos incompletos a {string}', async function (route) {
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

Then('Retorna un error', function () {
    hj.assertThat(body.message, hj.equalTo('Se enviaron datos incompletos'));
});
