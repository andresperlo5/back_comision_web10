const { validationResult } = require("express-validator");
const { agregarProductoAlCarritoBD } = require("../services/carrito.services");

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

module.exports = {
  agregarProductoAlCarrito,
};
