const { Router } = require("express");
const {
  agregarProductoAlCarrito,
} = require("../controllers/carrito.controllers");
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const router = Router();

router.post(
  "/add/:idProduct",
  [check("id", "ERROR. ID. Formato incorrecto").isMongoId()],
  auth("usuario"),
  agregarProductoAlCarrito
);

module.exports = router;
