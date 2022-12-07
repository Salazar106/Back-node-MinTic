const express = require("express");
const env = require("../models/env");
const router = express.Router();
const Envios = require("../models/env");

//create order

//?localhost:6000/env/newEnv
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

//?----localhost:6000/env/envByid/???
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

//?----localhost:6000/env/update/???
router.put("/update/:id", (req, res) => {
 const {id}=req.params;
    const {
    fecha,
    largo,
    ancho,
    alto,
    peso,
    direccionR,
    ciudadR,
    nombredestinatario,
    cedula,
    direccionE,
    ciudadE,
    estado
  } = req.body;
  Envios.updateOne({_id:id},{$set:
   { fecha,
    largo,
    ancho,
    alto,
    peso,
    direccionR,
    ciudadR,
    nombredestinatario,
    cedula,
    direccionE,
    ciudadE,
    estado}
  }).then((env)=>{res.json(env)}).catch((error)=>res.json({msg:"ocurrio algo malo"}));
  
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
