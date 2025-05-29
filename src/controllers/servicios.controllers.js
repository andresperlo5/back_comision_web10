const mercadoPagoConfigServices = require("../services/servicios.services");

const pagarCarritoProductos = async (req, res) => {
  /* const {} = await  mercadoPagoConfigServices(req.body.carrito) */
  const { statusCode, msg, urlRes, error } = await mercadoPagoConfigServices();
  res.status(statusCode).json({ msg, urlRes });
};

module.exports = pagarCarritoProductos;
