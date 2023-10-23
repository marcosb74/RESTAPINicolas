const mongoose = require("mongoose");
const schema = mongoose.Schema;

const usuariosSchema = new schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  nombre: {
    type: String,
    required: "Agrega tu nombre",
  },
  password: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Usuarios", usuariosSchema);
