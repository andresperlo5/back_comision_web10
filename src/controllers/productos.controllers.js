const { validationResult } = require("express-validator");
const {
  obtenerTodosLosProductosArray,
  obtenerUnProductoPorIdArray,
  crearNuevoProductoArray,
  actualizarProductoPorIdArray,
  borrarUnProductoPorIdArray,
  agregarImagenDB,
} = require("../services/productos.services");

const obtenerTodosProductos = async (req, res) => {
  const { productos, statusCode, error } =
    await obtenerTodosLosProductosArray();
  try {
    res.status(statusCode).json({ productos });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const obtenrUnProducto = async (req, res) => {
  const resValidation = validationResult(req);

  if (!resValidation.isEmpty()) {
    return res.status(422).json({ msg: resValidation.array() });
  }

  const { producto, msg, statusCode, error } =
    await obtenerUnProductoPorIdArray(req.params.id);

  try {
    res.status(statusCode).json(producto ? { producto } : { msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const crearProducto = async (req, res) => {
  const resValidation = validationResult(req);

  if (!resValidation.isEmpty()) {
    return res.status(422).json({ msg: resValidation.array() });
  }

  const { msg, statusCode, error, idProducto } = await crearNuevoProductoArray(
    req.body,
    req
  );
  try {
    res.status(statusCode).json({ msg, idProducto });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

const agregarImagen = async (req, res) => {
  const { msg, statusCode, idProducto } = await agregarImagenDB(
    req.params.id,
    req.file
  );
  res.status(statusCode).json({ msg, idProducto });
};

const actualizarProducto = async (req, res) => {
  const resValidation = validationResult(req);

  if (!resValidation.isEmpty()) {
    return res.status(422).json({ msg: resValidation.array() });
  }

  const { msg, statusCode, error } = await actualizarProductoPorIdArray(
    req.params.id,
    req.body
  );

  try {
    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

const borrarProducto = async (req, res) => {
  const resValidation = validationResult(req);

  if (!resValidation.isEmpty()) {
    return res.status(422).json({ msg: resValidation.array() });
  }

  const { msg, statusCode, error } = await borrarUnProductoPorIdArray(
    req.params.id
  );

  try {
    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  obtenerTodosProductos,
  obtenrUnProducto,
  crearProducto,
  actualizarProducto,
  borrarProducto,
  agregarImagen,
};
