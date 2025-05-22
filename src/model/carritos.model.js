const { Schema, model } = require("mongoose")

const CarritoSchema = new Schema({
  idUsuario:{
    type: String,
  },
  productos: []
})

const CarritoModel = model("carrito", CarritoSchema)
module.exports = CarritoModel