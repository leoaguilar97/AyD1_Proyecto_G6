
const { Given, When, Then, After } = require('cucumber');
const faker = require('faker');
faker.setLocale('es_MX');

const got = require('got');
const chai = require('chai');

const { expect } = chai;

process.env.TESTING = true;

const db = require('../../app/models/index');
const { assert } = require('chai');
const Producto = db.producto;
const Categoria = db.categoria;

let alreadyInsertedProducts = false;
let alreadyInsertedCategories = false;

let productIds = [];
let categoryIds = [];

Given('que existen los siguientes productos', async function (productTable) {
    if (!alreadyInsertedProducts){

        let tmpProducts = [];
    
        productTable.rawTable.forEach(product => {
            tmpProducts.push({
                nombre: product[0],
                categorias: [],
                proveedores: []
            });
        });
        
        this.products = await Producto.insertMany(tmpProducts)
            .then(docs => { return docs; })
            .catch(error => { console.error(error); });

        await this.products.forEach(p => { productIds.push(db.mongoose.Types.ObjectId(p.id)); });

        alreadyInsertedProducts = true;    
    }
    else {
        //recargar los datos
        this.products = await Producto.find({ '_id': { $in: productIds }}).then((docs) => { return docs });
    }
    return true;
});

Given('las siguientes categorias', async function (categoriesTable) {
    if (!alreadyInsertedCategories){

        let tmpCategories = [];
    
        categoriesTable.rawTable.forEach(category => {
            tmpCategories.push({
                nombre: category[0],
                categorias: [],
                proveedores: []
            });
        });
        
        this.categories = await Categoria.insertMany(tmpCategories)
            .then(docs => { return docs; })
            .catch(error => { console.error(error); });
            
        await this.categories.forEach(c => { categoryIds.push(db.mongoose.Types.ObjectId(c.id)); });

        alreadyInsertedCategories = true;
    }
    else {
        this.categories = await Categoria.find({ '_id': { $in: categoryIds }}).then((docs) => { return docs });
    }
});

Then('se utilizarán de prueba en los siguientes escenario', function () {
    expect(this.products).to.be.an("array");
    expect(this.categories).to.be.an("array");
    this.deleteDb = false;
});

When('se registra el producto con las siguientes categorias', async function(dataTable){
    let product = dataTable.rawTable[1][0]; //el nombre del producto
    
    let categories = await dataTable.rawTable.slice(1).map(c => c[1]); //obtener los nombres de las categorias
    this.categoryIds = await this.categories.filter(c => categories.indexOf(c.nombre) > -1).map(c => c.id); 
    
    let newProduct = {
        nombre: product,
        categorias: this.categoryIds,
        proveedores: []
    };

    this.newProduct = await Producto.create(newProduct).then(doc => { return doc; });
    productIds.push(this.newProduct.id);
});

Then('se vinculan todas las categorias enviadas al producto registrado', function () {
    expect(this.newProduct).to.be.a("object");
    assert.property(this.newProduct, "id");
    assert.property(this.newProduct, "categorias");
    assert.includeMembers(this.newProduct.categorias, this.categoryIds);
});

Given('el producto {string}', async function (productName) {
    // encontra el id del producto
    this.product = await this.products.find(p => p.nombre == productName);
    expect(this.product).to.be.an("object");
    assert.property(this.product, "id");
    assert.property(this.product, "categorias");
});

When('se le agrega la categoria {string}', async function (categoryName) {
    
    // Write code here that turns the phrase above into concrete actions
    this.category = await this.categories.find(c => c.nombre == categoryName);
    expect(this.category).to.be.an("object");
    assert.property(this.category, "id");
    assert.property(this.category, "nombre");

    let categories = this.product.categorias;
    categories.push(this.category.id);

    this.product = await Producto
        .findOneAndUpdate({ _id: this.product.id }, { categorias: categories }, { useFindAndModify: false, new: true })
        .then(doc => { return doc; });
});

Then('el producto contiene en su lista la categoria agregada.', async function () {

    let product = await Producto
        .findById(this.product.id)
        .populate("categorias")
        .then(doc => { return doc;});

    expect(product).to.be.an("object");
    assert.property(product, "id");
    assert.property(product, "categorias");
    expect(product.categorias).to.be.an("array");

    let productCategoryNames = await product.categorias.map(c => c.nombre);
    
    //revisar si incluye la categoria
    expect(productCategoryNames).to.include(this.category.nombre);
});

When('se requiere eliminarle la categoria {string}', async function (categoryName) {
    this.category = await this.categories.find(c => c.nombre == categoryName);
    
    expect(this.category).to.be.an("object");
    assert.property(this.category, "id");
    assert.property(this.category, "nombre");

    let categories = this.product.categorias;
    categories = categories.filter(c => c != this.category.id);

    this.product = await Producto
        .findOneAndUpdate({ _id: this.product.id }, { categorias: categories }, { useFindAndModify: false, new: true })
        .then(doc => { return doc; });
});

Then('el producto ya no contiene en su lista la categoria agregada', async function () {
    let product = await Producto
        .findById(this.product.id)
        .populate("categorias")
        .then(doc => { return doc;});

    expect(product).to.be.an("object");
    assert.property(product, "id");
    assert.property(product, "categorias");
    expect(product.categorias).to.be.an("array");

    let productCategoryNames = await product.categorias.map(c => c.nombre);

    expect(productCategoryNames).to.not.include(this.category.nombre);

    //ya que es el ultimo por ahora:
    this.deleteDb = true;
});

After(function () {
    if (this.deleteDb){
        Producto
            .deleteMany({ "_id": { $in: this.products.map(p => p.id)}})
            .then(docs => { console.log("Productos eliminados"); })
            .catch(error => { console.error(error); })

        Categoria
            .deleteMany({ "_id": { $in: this.categories.map(c => c.id)}})
            .then(docs => { console.log("Categorias eliminadas"); })
            .catch(error => { console.error(error); })
    }
});