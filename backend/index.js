const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.mongoose.set('useNewUrlParser', true);
db.mongoose.set('useFindAndModify', false);
db.mongoose.set('useCreateIndex', true);

db.mongoose
    .connect(!process.env.TESTING ? db.testUrl : db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch(err => {
        console.log("No se pudo conectar a la base de datos", err);
        process.exit();
    });

// simple route
app.get("/", (req, res) => {
    res.json({ mensaje: "Sitio Funcionando V2" });
});

require("./app/routes/usuario")(app);
require("./app/routes/producto")(app);
require("./app/routes/login")(app);
require("./app/routes/bodega")(app);
require("./app/routes/categoria")(app);
require("./app/routes/sede")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`API escuchando en el puerto ${PORT}.`);
});

module.exports = server;