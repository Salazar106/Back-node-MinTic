const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  nombre: { type: String, required: true },
  username: { type: String, required: true },
  correo: { type: String, required: true },
  password: { type: String, required: true },
});


module.exports=mongoose.model('User',userSchema);