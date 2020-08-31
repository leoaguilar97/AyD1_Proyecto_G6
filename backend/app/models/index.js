const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.js")(mongoose);
db.usuario = require("./usuario.js")(mongoose);
db.producto = require("./producto")(mongoose);

module.exports = db;