const express = require("express");
const {
  obtenerTodosProductos,
  obtenrUnProducto,
  crearProducto,
  actualizarProducto,
  borrarProducto,
  agregarImagen,
} = require("../controllers/productos.controllers");
const { check } = require("express-validator");
const multerMiddlewares = require("../middlewares/multer.middlewares");
const router = express.Router();

//rutas
//Obtener todos los productos
router.get("/", obtenerTodosProductos);
//Obtener un producto
router.get(
  "/:id",
  [check("id", "ERROR. ID. Formato incorrecto").isMongoId()],
  obtenrUnProducto
);
//Crear un producto
router.post(
  "/",
  [
    check("nombre", "Campo NOMBRE vacio").notEmpty(),
    check("precio", "Campo PRECIO vacio").notEmpty(),
    check("descripcion", "Campo DESCRIPCION vacio").notEmpty(),
  ],
  crearProducto
);
router.put("/addImage/:id", multerMiddlewares.single("imagen"), agregarImagen);
//Actualizar un producto
router.put(
  "/:id",
  [check("id", "ERROR. ID. Formato incorrecto").isMongoId()],
  actualizarProducto
);
//Eliminar un producto
router.delete(
  "/:id",
  [check("id", "ERROR. ID. Formato incorrecto").isMongoId()],
  borrarProducto
);

module.exports = router;
