const mongoose = require("mongoose");

const envSchema = mongoose.Schema({

  fecha: { type: Date, required: true },
  largo: { type: Number, required: true },
  ancho: { type: Number, required: true },
  alto: { type: Number, required: true },
  peso: { type: Number, required: true },
  direccionR: { type: String, required: true },
  ciudadR: { type: String, required: true },
  nombredestinatario: { type: String, required: true },
  cedula: { type: Number, required: true },
  direccionE: { type: String, required: true },
  ciudadE: { type: String, required: true },
  estado: { type: String, default: "Por Entregar" },
});

module.exports = mongoose.model("Envios", envSchema);
