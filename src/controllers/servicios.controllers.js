const {
  mercadoPagoConfigServices,
  sendEmailRecoveryPassUserServices,
  changePassUserServices,
} = require("../services/servicios.services");

const pagarCarritoProductos = async (req, res) => {
  const { statusCode, msg, urlRes, error } = await mercadoPagoConfigServices();
  res.status(statusCode).json({ msg, urlRes });
};

const recuperarContraseniaDelUsuario = async (req, res) => {
  const { msg, statusCode, error } = await sendEmailRecoveryPassUserServices(
    req.body.emailUsuario
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const cambiarContraseniaUsuario = async (req, res) => {
  const token = req.header("auth");
  const { msg, statusCode, error } = await changePassUserServices(
    token,
    req.body.nuevaContrasenia
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  pagarCarritoProductos,
  recuperarContraseniaDelUsuario,
  cambiarContraseniaUsuario,
};
