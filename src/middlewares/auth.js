const jwt = require("jsonwebtoken");

module.exports = (rolRuta) => (req, res, next) => {
  const token = req.header("auth");
  const verificarToken = jwt.verify(token, process.env.JWT_SECRET);

  if (verificarToken.rolUsuario === rolRuta) {
    req.idUsuario = verificarToken.idUsuario;
    req.idCarrito = verificarToken.idCarrito;
    req.idFavoritos = verificarToken.idFavoritos;
    next();
  } else {
    res.status(401).json({
      msg: "No estas autorizado a ingresar a esta parte de la pagina",
    });
  }
};
