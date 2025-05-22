//Mongoose  - ODM -
const mongoose = require("mongoose");

const ProductosSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  habilitado: {
    type: Boolean,
    default: false,
  },
  /* habilitado: {
    type: String,
    default: "deshabilitado",
    enum: ["habilitado", "deshabilitado"],
  }, */
  imagen: {
    type: String,
    default: "",
  },
});

const ProductosModel = mongoose.model("productos", ProductosSchema);
module.exports = ProductosModel;
