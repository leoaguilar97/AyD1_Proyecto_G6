const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.usuario = require("./usuario.js")(mongoose);
db.producto = require("./producto")(mongoose);

module.exports = db;