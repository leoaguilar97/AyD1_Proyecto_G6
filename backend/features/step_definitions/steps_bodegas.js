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

let bodega = {
    "nombre": "Departamento de " + faker.commerce.department(),
    "direccion": faker.address.streetAddress(),
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
        json: bodega,
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

When('se hace un http post a {string}, con informacion de la bodega [nombre, direccion]', async function(route) {
    await got.post(route, postData());

    hj.assertThat(statusCode, hj.equalTo(200));
    hj.assertThat(message, hj.equalTo('created'));
});

Then('la bodega es guardada en la base de datos', async function() {
    hj.assertThat(body, hj.hasProperty('bodega'));
    hj.assertThat(body.bodega, hj.hasProperty('nombre'));
    hj.assertThat(body.bodega, hj.hasProperty('direccion'));
});

Then('se asigna un identificador unico a la bodega.', function() {
    hj.assertThat(body.bodega, hj.hasProperty('id'));
    hj.assertThat(body.bodega.id, hj.hasSize(24));
    hj.assertThat(body.bodega.id, hj.is(hj.string()));

    bodega.id = body.bodega.id;
});

When('se envian datos incompletos a {string}', async function(route) {
    let toPost = postData();
    toPost.json = {
        "nombre": "Departamento de " + faker.commerce.department()
            // hace falta la direccion de la bodega
    };

    try {
        await got.post(route, toPost);
    } catch (error) { /* ERROR ESPERADO */ }

    hj.assertThat(statusCode, hj.equalTo(400));
});

Then('retorna un error.', function() {
    hj.assertThat(message, hj.equalTo('Se enviaron datos incompletos'));
});

When('se hace un http get a {string}', async function(route) {
    await got.get(route, { responseType: 'json', hooks: { afterResponse: hooks.afterResponse } });

    hj.assertThat(statusCode, hj.equalTo(200));
    hj.assertThat(message, hj.equalTo('retrieved'));
});

Then('las bodegas son retornadas en forma de lista.', function() {
    hj.assertThat(body.bodegas, hj.is(hj.array()));
});

When('se hace un http get a {string} y se envia como parametro :id un identificador de bodega', async function(route) {
    await got.get(route.replace(':id', bodega.id), getData());

    hj.assertThat(statusCode, hj.equalTo(200));
    hj.assertThat(message, hj.equalTo('retrieved'));
});

Then('la bodega es retornada en forma de objeto', function() {
    hj.assertThat(body.bodega, hj.hasProperty('nombre'));
    hj.assertThat(body.bodega, hj.hasProperty('direccion'));

    hj.assertThat(body.bodega.nombre, hj.equalTo(bodega.nombre));
    hj.assertThat(body.bodega.direccion, hj.equalTo(bodega.direccion));
    hj.assertThat(body.bodega.id, hj.equalTo(bodega.id));
});

When('se hace un http get a {string} y se envia como parametro :id un identificador de bodega que no existe', async function(route) {
    try {
        await got.get(route.replace(":id", "000000000000"), getData());
    } catch (ex) {}

    hj.assertThat(message, hj.containsString('No existe'));
});

When('se hace un http put a {string} y se envía como parámetro :id un identificador de bodega y se envian datos nuevos de la bodega [nombre o direccion]', async function(route) {
    bodega.nombre = "Departamento de " + faker.commerce.department();
    bodega.direccion = faker.address.streetAddress();

    await got.put(route.replace(':id', bodega.id), postData());

    hj.assertThat(statusCode, hj.equalTo(200));
});

Then('la bodega es modificada exitosamente', function() {
    hj.assertThat(message, hj.equalTo('modified'));
});

Then('retornada en forma de objeto con los datos modificados', function() {
    hj.assertThat(body.bodega.nombre, hj.equalTo(bodega.nombre));
    hj.assertThat(body.bodega.direccion, hj.equalTo(bodega.direccion));
    hj.assertThat(body.bodega.id, hj.equalTo(bodega.id));
});

When('se hace un http put a {string} y se envía como parámetro :id un identificador de bodega que no existe', async function(route) {
    try {
        await got.get(route.replace(":id", "000000000000"), getData());
    } catch (ex) {}

    hj.assertThat(message, hj.containsString('No existe'));
});

When('se hace un http delete a {string} y se envía como parámetro :id un identificador de bodega', async function(route) {
    await got.delete(route.replace(':id', bodega.id), postData());

    hj.assertThat(statusCode, hj.equalTo(200));
});

Then('la bodega es eliminada de la base de datos', function() {
    hj.assertThat(message, hj.equalTo('deleted'));
});

When('se hace un http delete a {string} y se envía como parámetro :id un identificador de bodega que no existe', async function(route) {
    try {
        await got.get(route.replace(":id", "000000000000"), getData());
    } catch (ex) {}

    hj.assertThat(message, hj.containsString('No existe'));
});

Then('devuelve un error {int}', function(code) {
    hj.assertThat(statusCode, hj.equalTo(code));
});

When('se hace un http post a {string}', async function(route) {
    let post = postData();
    post.json = {
        "bodega": "5f6020cde1f24eafd89243b9",
        "productos": [{
                "producto": "5f6eb928d08aa500178e6e1e",
                "cantidad": 20
            },
            {
                "producto": "5f6eb8e4d08aa500178e6e1c",
                "cantidad": 20
            },
            {
                "producto": "5f6e8cbdd99abe00170fb238",
                "cantidad": 30
            },
            {
                "producto": "5f6e72286e733d0017a8d47e",
                "cantidad": 40
            }
        ]
    }
    try {
        this.productosAagregados = await got.post(route, post);
    } catch (ex) {}

    hj.assertThat(message, hj.containsString('La bodega 5f6020cde1f24eafd89243b9 No existe'));
});

Then('se espera un error {int} ya que la bodega no existe', function(code) {
    console.log(message);
    hj.assertThat(message, hj.containsString('La bodega 5f6020cde1f24eafd89243b9 No existe'));
    hj.assertThat(statusCode, hj.equalTo(code));
});