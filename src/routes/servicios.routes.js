const express = require("express");
const {
  pagarCarritoProductos,
  recuperarContraseniaDelUsuario,
  cambiarContraseniaUsuario,
} = require("../controllers/servicios.controllers");
const router = express.Router();

//rutas
router.post("/pagoConMercadoPago", pagarCarritoProductos);
router.post("/sendEmailRecoveryPassUser", recuperarContraseniaDelUsuario);
router.put("/updateChangePassUser", cambiarContraseniaUsuario);

module.exports = router;
