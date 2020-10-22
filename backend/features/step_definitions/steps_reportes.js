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


When('se hace un http get a {string} se devuelve una lista de categorias con el porcentaje de venta.', function(ruta) {
    let res = {
        send: () => {},
        status: sinon.stub().returnsThis()
    };

    const mock = sinon.mock(res);
    mock.expects("send").once();

    sandbox.stub(controllerReportes.Venta, 'find').returns({
        populate: () => {
            return {
                populate: () => {
                    return {
                        populate: () => {
                            return {
                                then: (cb) => {
                                    cb([])
                                    mock.verify();

                                    expect(res.status.calledOnce).to.be.true;
                                    expect(res.status.firstCall.calledWithExactly(200)).to.be.true;

                                    return {
                                        catch: (cb) => {
                                            cb({})
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
    });

    controllerReportes.categorias({ body: {} }, res);
});