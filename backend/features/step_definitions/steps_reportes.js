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

var reporteDia = "";
When('el usuario realiza un reporte por dia, el dia {string} por ejemplo.', function(dia) {
    reporteDia = dia
});

Then('se devuelven los datos para el reporte.', { timeout: 7 * 1000 }, async function() {
    let res = {
        send: () => {},
        status: sinon.stub().returnsThis()
    };

    const mockR = sinon.mock(res);
    mockR.expects("send").once();

    await controllerReportes.dias({ params: { dia: reporteDia } }, res);

    expect(res.status.calledOnce).to.be.true;
    expect(res.status.firstCall.calledWithExactly(200)).to.be.true;

    mockR.verify();
});

var reporteMes = "";
When('el usuario realiza un reporte por mes, el mes {string} por ejemplo.', function(mes) {
    reporteMes = mes
});

Then('se devuelven los datos para el reporte del mes.', { timeout: 7 * 1000 }, async function() {
    let res = {
        send: () => {},
        status: sinon.stub().returnsThis()
    };

    const mockR = sinon.mock(res);
    mockR.expects("send").once();

    await controllerReportes.mes({ params: { mes: reporteMes } }, res);

    expect(res.status.calledOnce).to.be.true;
    expect(res.status.firstCall.calledWithExactly(200)).to.be.true;

    mockR.verify();
});

var reporteAno = "";
When('el usuario realiza un reporte por ano, el ano {string} por ejemplo.', function(ano) {
    reporteAno = ano
});

Then('se devuelven los datos para el reporte del ano.', { timeout: 7 * 1000 }, async function() {
    let res = {
        send: () => {},
        status: sinon.stub().returnsThis()
    };

    const mockR = sinon.mock(res);
    mockR.expects("send").once();

    await controllerReportes.ano({ params: { ano: reporteAno } }, res);

    expect(res.status.calledOnce).to.be.true;
    expect(res.status.firstCall.calledWithExactly(200)).to.be.true;

    mockR.verify();
});