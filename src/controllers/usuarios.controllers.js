const {
  registroUsuariosDb,
  inicioSesionUsuarioDb,
  habilitadDeshabilitarUsuarioDB,
  obtenerTodosLosUsuariosDb,
  obtenerUnUsuarioPorIdDb,
  actualizarUnUsuarioPorIdDb,
  eliminarUnUsuarioPorIdDb,
} = require("../services/usuarios.services");
const { validationResult } = require("express-validator");

const obtenerTodosLosUsuarios = async (req, res) => {
  const { usuarios, statusCode, error } = await obtenerTodosLosUsuariosDb();
  try {
    res.status(statusCode).json({ usuarios });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const obtenerUnUsuarioPorId = async (req, res) => {
  const resValidation = validationResult(req);

  if (!resValidation.isEmpty()) {
    return res.status(422).json({ msg: resValidation.array() });
  }

  const { usuario, msg, statusCode, error } = await obtenerUnUsuarioPorIdDb(
    req.params.id
  );
  try {
    res.status(statusCode).json(statusCode === 200 ? usuario : { msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const registroUsuario = async (req, res) => {
  console.log(req.body);
  const resValidation = validationResult(req);

  if (!resValidation.isEmpty()) {
    return res.status(422).json({ msg: resValidation.array() });
  }

  const { msg, statusCode, error } = await registroUsuariosDb(req.body);

  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const actualizarUnUsuarioPorId = async (req, res) => {
  const { msg, statusCode, error } = await actualizarUnUsuarioPorIdDb(
    req.params.id,
    req.body
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const eliminarUnUsuarioPorId = async (req, res) => {
  const { msg, statusCode, error } = await eliminarUnUsuarioPorIdDb(
    req.params.id
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const inicioSesionUsuario = async (req, res) => {
  const resValidation = validationResult(req);

  if (!resValidation.isEmpty()) {
    return res.status(422).json({ msg: resValidation.array() });
  }

  const { msg, statusCode, token, error, rolUsuario } =
    await inicioSesionUsuarioDb(req.body);

  try {
    res.status(statusCode).json({ msg, token, rolUsuario });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const habilitadDeshabilitarUsuario = async (req, res) => {
  const { msg, statusCode, error } = await habilitadDeshabilitarUsuarioDB(
    req.params.id
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  obtenerTodosLosUsuarios,
  obtenerUnUsuarioPorId,
  registroUsuario,
  actualizarUnUsuarioPorId,
  eliminarUnUsuarioPorId,
  inicioSesionUsuario,
  habilitadDeshabilitarUsuario,
};
