const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.testUrl = dbConfig.testUrl;

db.usuario = require("./usuario.js")(mongoose);
db.producto = require("./producto")(mongoose);
db.bodega = require('./bodega')(mongoose);
db.categoria = require('./categoria')(mongoose);
db.sede = require('./sede')(mongoose);

module.exports = db;