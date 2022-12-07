const express = require("express");
const router = express.Router();
const Envios = require("../models/env");

//create order

//!localhost:6000/env/newEnv
router.post("/newEnv", (req, res) => {
  const newEnv = Envios(req.body);
  newEnv
    .save()
    .then((envios) => {
      res.json({ mensaje: "Orden Creada correctamente", envios });
    })
    .catch((error) => console.error(error));
});

//?----localhost:6000/env/allEnvs
router.get("/allEnvs", (req, res) => {
  Envios.find().then((envs) => {
    res.send(envs);
  });
});

//?----localhost:6000/env/allEnvs
router.get("/envByid/:id", (req, res) => {
  const { id } = req.params;

  Envios.findById(id).then((envio) => {
    if (!envio) {
      return res.json({ mensaje: "envio no encontrado" });
    } else {
      res.send(envio);
    }
  });
});

//?----localhost:6000/env/delete/???
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  Envios.findByIdAndDelete(id).then((env) => {
    if (env) {
      return res.json({ mensaje: "orden Eliminada Corectamente" });
    } else {
      res.json({ menssage: "No se encontro la oreder" });
    }
  });
});

module.exports = router;
