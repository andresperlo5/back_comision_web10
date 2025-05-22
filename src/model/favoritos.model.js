const { Schema, model } = require("mongoose");

const FavoritoSchema = new Schema({
  idUsuario: {
    type: String,
  },
  productos: [],
});

const FavoritosModel = model("favoritos", FavoritoSchema);
module.exports = FavoritosModel;
