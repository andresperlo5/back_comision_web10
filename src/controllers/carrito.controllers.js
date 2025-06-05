const { validationResult } = require("express-validator");
const {
  agregarProductoAlCarritoBD,
  obtenerTodosLosProductosDelCarritoBD,
  eliminarUnProductoPorIdBD,
} = require("../services/carrito.services");

const obtenerTodosLosProductosDelCarrito = async (req, res) => {
  const { statusCode, productos, error } =
    await obtenerTodosLosProductosDelCarritoBD(req.idCarrito);
  try {
    res.status(statusCode).json(productos);
  } catch {
    res.status(statusCode).json(error);
  }
};

const agregarProductoAlCarrito = async (req, res) => {
  const resValidation = validationResult(req);

  if (!resValidation.isEmpty()) {
    return res.status(422).json({ msg: resValidation.array() });
  }

  const { msg, statusCode, error } = await agregarProductoAlCarritoBD(
    req.idCarrito,
    req.params.idProduct
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json(error);
  }
};

const eliminarUnProductoPorId = async (req, res) => {
  const { msg, statusCode, error } = await eliminarUnProductoPorIdBD(
    req.idCarrito,
    req.params.idProduct
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  agregarProductoAlCarrito,
  obtenerTodosLosProductosDelCarrito,
  eliminarUnProductoPorId,
};
