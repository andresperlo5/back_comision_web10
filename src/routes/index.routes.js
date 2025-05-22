const { Router } = require("express");
const router = Router();

const rutasProductos = require("./productos.routes");
const rutasUsuarios = require("./usuarios.routes");
const rutasCarritos = require("./carritos.routes");
const rutasServicios = require("./servicios.routes");

router.use("/productos", rutasProductos);
router.use("/usuarios", rutasUsuarios);
router.use("/carritos", rutasCarritos);
router.use("/servicios", rutasServicios);

module.exports = router;
