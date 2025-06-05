const { Router } = require("express");
const {
  agregarProductoAlCarrito,
  obtenerTodosLosProductosDelCarrito,
  eliminarUnProductoPorId,
} = require("../controllers/carrito.controllers");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const router = Router();

router.get("/", auth("usuario"), obtenerTodosLosProductosDelCarrito);

router.put(
  "/add/:idProduct",
  /*   [check("id", "ERROR. ID. Formato incorrecto").isMongoId()], */
  auth("usuario"),
  agregarProductoAlCarrito
);

router.put(
  "/deleteProduct/:idProduct",
  auth("usuario"),
  eliminarUnProductoPorId
);

module.exports = router;
