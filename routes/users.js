const express = require("express");
const router = express.Router();
const Usuario = require("../models/users");
const bcrypt = require("bcrypt");

//create user

//localhost:6000/user/registro
router.post("/registro", (req, res) => {
  const { nombre, username, correo, password } = req.body;
  Usuario.findOne({ correo } || { username }).then((usuario) => {
    if (usuario) {
      return res.json({
        mensaje: "Su correo o Username ya existen, intentalo denuevo",
      });
    } else if (!nombre || !username || !correo || !password) {
      return res.json({ mensaje: "Falta alguno de los campos por llenar" });
    } else {
      bcrypt.hash(password, 10, (error, passwordHashed) => {
        if (error) res.json({ error });
        else {
          const newUser = new Usuario({
            nombre,
            username,
            correo,
            password: passwordHashed,
          });
          newUser
            .save()
            .then((usuario) => {
              res.json({ mensaje: "Usuario Creado correctamente", usuario });
            })
            .catch((error) => console.error(error));
        }
      });
    }
  });
});

//localhost:6000/user/login
router.post("/login", (req, res) => {
  const { correo, password } = req.body;

  Usuario.findOne({ correo }).then((usuario) => {
    if (!usuario) {
      return res.json("Usuario no encontrado");
    }

    bcrypt.compare(password, usuario.password).then((escorrecta) => {
      if (escorrecta) {
        const { id, nombre, username } = usuario;

        res.json({
          mensaje: "Login correcto",
          usuario: {
            id,
            nombre,
            username,
          },
        });
      } else {
        return res.json({ mensaje: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
