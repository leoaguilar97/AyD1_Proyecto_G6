const assert = require('assert');
const chai = require('chai');

process.env.TESTING = true;

const app = require('../');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const usersRoute = "/api/usuario";
const prodsRoute = "/api/producto";
const loginRoute = "/api/auth/signin";

const CorrectUserDPI = 3000000000000;

const CorrectUserInfo = {
    nombre: "nombre",
    apellido: "apellido",
    dpi: CorrectUserDPI,
    correo: "test@test.com",
    fechaNacimiento: "01/01/2000",
    direccion: "direccion",
    numeroCelular: "00000000",
    password: "12345",
    roles: []
};

const ModifiedUserInfo = {
    nombre: "nombreModificado",
    apellido: "apellidoModificado",
    fechaNacimiento: "02/01/2000",
    correo: "modified@test.com",
    password: "12345",
    direccion: "direccionModificada",
    numeroCelular: "01010101",
    roles: [1, 2, 3]
};

const IncorrectUserInfo = {
    nombre: "nombre",
    apellido: "apellido",
    // FALTA EL DPI
    correo: "correo@test.com",
    fechaNacimiento: "01/01/2000",
    direccion: "direccion",
    numeroCelular: "0000000",
    password: "12345"
};

const CorrectProductInfo = {
    nombre: "producto",
    categorias: [],
    proveedores: []
};

const ModifiedProductInfo = {
    nombre: "productoModificado",
    categorias: [],
    proveedores: []
};

const IncorrectProductInfo = {
    // FALTA EL NOMBRE
    categorias: [],
    proveedores: []
};

const { expect } = chai;

const originalLogFunction = console.log;
let output;

beforeEach(function (done) {
    output = '';
    console.log = (msg) => {
        output += msg + '\n';
    };
    done();
});

afterEach(function () {
    console.log = originalLogFunction; // undo dummy log function
    if (this.currentTest.state === 'failed') {
        console.log(output);
    }
});

describe('Historia 3: Usuarios', () => {
    describe('POST /', () => {
        it("Guardar un usuario con datos correctos", done => {
            chai
                .request(app)
                .post(usersRoute)
                .send(CorrectUserInfo)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    done();
                });
        });

        it("Rechaza la información de un usuario con datos incorrectos", done => {
            chai
                .request(app)
                .post(usersRoute)
                .send(IncorrectUserInfo)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.a('object');
                    done();
                });
        });
    });

    describe('Historia: Autenticación', () => {
        it("Realiza el login de un usuario dado su correo y password", done => {
            chai
                .request(app)
                .post(loginRoute)
                .send({ correo: CorrectUserInfo.correo, password: CorrectUserInfo.password })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body.accessToken).to.be.a("string");
                    expect(res.body.roles).to.be.a("array");
                    expect(res.body.id).to.be.a("string");
                    done();
                });
        });

        it("Rechaza el login de un usuario", done => {
            chai
                .request(app)
                .post(loginRoute)
                .send({ correo: CorrectUserInfo.correo, password: "33" })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.be.a('object');
                    expect(res.body.accessToken).to.be.a("null");
                    expect(res.body.message).to.be.a("string");
                    done();
                });
        });
    });

    describe('GET /', () => {

        it("Obteniene todos los usuarios en la bd", done => {
            chai
                .request(app)
                .get(`${usersRoute}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    done();
                });
        });

        it("Obteniene un usuario dado su DPI", done => {
            chai
                .request(app)
                .get(`${usersRoute}/${CorrectUserDPI}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    done();
                });
        });

        it("Devuelve un error si no encuentra al usuario", done => {
            chai
                .request(app)
                .get(`${usersRoute}/0`)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.a('object');
                    done();
                });
        });
    });

    describe('PUT /', () => {
        it("Modifica los datos del usuario", done => {
            chai
                .request(app)
                .put(`${usersRoute}/${CorrectUserDPI}`)
                .send(ModifiedUserInfo)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    done();
                });
        });

        it("Devuelve un error si no se encuentra al usuario", done => {
            chai
                .request(app)
                .put(`${usersRoute}/0`)
                .send(ModifiedUserInfo)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.a('object');
                    done();
                });
        });
    });

    describe('DELETE /', () => {
        it("Elimina los datos del usuario", done => {
            chai
                .request(app)
                .delete(`${usersRoute}/${CorrectUserDPI}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    done();
                });
        });
    });
});

describe('Historia 4: Productos', () => {
    let productId = 0;
    describe('POST /', () => {
        it("Guardar un producto con datos correctos", done => {
            chai
                .request(app)
                .post(prodsRoute)
                .send(CorrectProductInfo)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    productId = res.body.id;
                    done();
                });
        });

        it("Rechaza la información de un producto con datos incorrectos", done => {
            chai
                .request(app)
                .post(prodsRoute)
                .send(IncorrectProductInfo)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.a('object');
                    done();
                });
        });
    });

    describe('GET /', () => {
        it("Obteniene todos los productos en la bd", done => {
            chai
                .request(app)
                .get(`${prodsRoute}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    done();
                });
        });

        it("Obteniene un producto dado su codigo", done => {
            chai
                .request(app)
                .get(`${prodsRoute}/${productId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    done();
                });
        });

        it("Devuelve un error si no encuentra el producto", done => {
            chai
                .request(app)
                .get(`${prodsRoute}/000000000000`)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.a('object');
                    done();
                });
        });
    });

    describe('PUT /', () => {
        it("Modifica los datos del producto", done => {
            chai
                .request(app)
                .put(`${prodsRoute}/${productId}`)
                .send(ModifiedProductInfo)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    done();
                });
        });

        it("Devuelve un error si no encuentra el producto", done => {
            chai
                .request(app)
                .put(`${prodsRoute}/000000000000`)
                .send(ModifiedUserInfo)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.a('object');
                    done();
                });
        });
    });

    describe('DELETE /', () => {
        it("Elimina los datos del producto", done => {
            chai
                .request(app)
                .delete(`${prodsRoute}/${productId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    done();
                });
        });
    });
});
