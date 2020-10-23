const { Given, When, Then, After, Before } = require('cucumber');
const faker = require('faker');
faker.setLocale('es_MX');

const got = require('got');
const chai = require('chai');
const controllerReportes = require('../../app/controllers/reportes');

const sinon = require('sinon');

const { expect } = chai;

process.env.TESTING = true;

let loadData = true;

const bodegas = [];
const productos = [];
const vendedores = [];
const clientes = [];

var sandbox;
Before(function() {
    sandbox = sinon.createSandbox();
});

After(function() {
    sandbox.restore();
});

When('el usuario realiza un reporte por categorias y se devuelven los datos del reporte.', { timeout: 7 * 1000 }, async function() {
    let res = {
        send: () => {},
        status: sinon.stub().returnsThis()
    };

    const mockR = sinon.mock(res);
    mockR.expects("send").once();

    await controllerReportes.categorias({ body: {} }, res);

    expect(res.status.calledOnce).to.be.true;
    expect(res.status.firstCall.calledWithExactly(200)).to.be.true;

    mockR.verify();
});


When('el usuario realiza un reporte por productos y se devuelven los datos para el reporte.', { timeout: 7 * 1000 }, async function() {
    let res = {
        send: () => {},
        status: sinon.stub().returnsThis()
    };

    const mockR = sinon.mock(res);
    mockR.expects("send").once();

    await controllerReportes.categorias({ body: {} }, res);

    expect(res.status.calledOnce).to.be.true;
    expect(res.status.firstCall.calledWithExactly(200)).to.be.true;

    mockR.verify();
});


When('el usuario realiza un reporte por vendedores y se devuelven los datos para el reporte.', { timeout: 7 * 1000 }, async function() {
    let res = {
        send: () => {},
        status: sinon.stub().returnsThis()
    };

    const mockR = sinon.mock(res);
    mockR.expects("send").once();

    await controllerReportes.vendedores({ body: {} }, res);

    expect(res.status.calledOnce).to.be.true;
    expect(res.status.firstCall.calledWithExactly(200)).to.be.true;

    mockR.verify();
});