const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.usuario;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.dpi = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  Usuario.findOne({ dpi: dpi }, function (err, user) {
    if (err) {
      res
        .status(500)
        .send({ message: err });
      return;
    }

    if (!user) {
      res
        .status(404)
        .send({ message: "Not found Usuario with dpi " + dpi });
        return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Usuario with dpi=" + dpi });
    });
};

isEncargado = (req, res, next) => {
  Usuario.findOne({ dpi: dpi }, function (err, user) {
    if (err) {
      res
        .status(500)
        .send({ message: err });
      return;
    }

    if (!user) {
      res
        .status(404)
        .send({ message: "Not found Usuario with dpi " + dpi });
        return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "encargado") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require encargado Role!" });
        return;
      }
    );
  })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Usuario with dpi=" + dpi });
    });
};


const authJwt = {
  verifyToken,
  isAdmin,
  isEncargado
};
module.exports = authJwt;
