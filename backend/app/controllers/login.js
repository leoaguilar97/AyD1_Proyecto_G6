const config = require("../config/auth.config");
const db = require("../models");
const User = db.usuario;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signin = (req, res) => {
  User.findOne({
    correo: req.body.correo
  }, function (err, user) {
    if (err) {
      res
        .status(500)
        .send({ message: "Error retrieving Usuario with dpi=" + dpi });
        return;
    } 
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    bcrypt.genSaltSync(8);

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    var authorities = [];

    for (let i = 0; i < user.roles.length; i++) {
      authorities.push("ROLE_" + user.roles[i].toUpperCase());
    }
    
    res.status(200).send({
      id: user._id,
      usuario: user.usuario,
      email: user.email,
      roles: authorities,
      accessToken: token
    });
  })
  .catch(err => {
    res
      .status(500)
      .send({ message: "Loguin error whit correo=" + req.body.correo });
  });
};
