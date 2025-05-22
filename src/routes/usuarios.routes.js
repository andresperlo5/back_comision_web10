const express = require("express");
const {
  registroUsuario,
  inicioSesionUsuario,
  habilitadDeshabilitarUsuario,
  obtenerTodosLosUsuarios,
  obtenerUnUsuarioPorId,
  eliminarUnUsuarioPorId,
  actualizarUnUsuarioPorId,
} = require("../controllers/usuarios.controllers");
const auth = require("../middlewares/auth");
const router = express.Router();
const { check } = require("express-validator");

router.get("/", obtenerTodosLosUsuarios);

router.get(
  "/:id",
  [check("id", "ERROR. ID. Formato incorrecto").isMongoId()],
  obtenerUnUsuarioPorId
);
router.post(
  "/register",
  [
    check("nombreUsuario", "Campo NOMBRE esta vacio").notEmpty(),
    check(
      "nombreUsuario",
      "ERROR. Cantidad minima 5 caracteres y maxima 50 caracteres"
    ).isLength({ min: 5 }, { max: 50 }),
    check(
      "nombreUsuario",
      "ERROR. Formato del USUARIO incorrecto. Solo se aceptan letras y numeros"
    ).matches(/^[A-Za-z0-9]+$/),
    check("emailUsuario", "Campo EMAIL esta vacio").notEmpty(),
    check("emailUsuario", "ERROR. Formato EMAIL incorrecto").isEmail(),
    check("contrasenia", "Campo CONTRASEÑA esta vacio").notEmpty(),
    check(
      "contrasenia",
      "ERROR. Cantidad minima 8 caracteres y maxima de 32 caracteres"
    ).isLength({ min: 8 }, { max: 32 }),
  ],
  registroUsuario
);
router.post(
  "/login",
  [
    check("nombreUsuario", "Campo NOMBRE esta vacio").notEmpty(),
    check(
      "nombreUsuario",
      "ERROR. Cantidad minima 5 caracteres y maxima 50 caracteres"
    ).isLength({ min: 5 }, { max: 50 }),
    check(
      "nombreUsuario",
      "ERROR. Formato del USUARIO incorrecto. Solo se aceptan letras y numeros"
    ).matches(/^[A-Za-z0-9]+$/),
    check("contrasenia", "Campo CONTRASEÑA esta vacio").notEmpty(),
    check(
      "contrasenia",
      "ERROR. Cantidad minima 8 caracteres y maxima de 32 caracteres"
    ).isLength({ min: 8 }, { max: 32 }),
  ],
  inicioSesionUsuario
);
router.put(
  "/:id",
  [check("id", "ERROR. ID. Formato incorrecto").isMongoId()],
  actualizarUnUsuarioPorId
);
router.put(
  "/enableDisabled/:id",
  [check("id", "ERROR. ID. Formato incorrecto").isMongoId()],
  habilitadDeshabilitarUsuario
);

router.delete(
  "/:id",
  [check("id", "ERROR. ID. Formato incorrecto").isMongoId()],
  eliminarUnUsuarioPorId
);

//rutas

module.exports = router;
