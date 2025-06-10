const UsuariosModel = require("../model/usuarios.model");
const CarritoModel = require("../model/carritos.model");
const FavoritosModel = require("../model/favoritos.model");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const { registroExitoso } = require("../helpers/messages.helpers");

const obtenerTodosLosUsuariosDb = async () => {
  try {
    //const usuarios = await UsuariosModel.find().select("-contrasenia -estado -rol");
    const usuarios = await UsuariosModel.find();

    return {
      usuarios,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const obtenerUnUsuarioPorIdDb = async (idUsuario) => {
  try {
    /*   const usuario = await UsuariosModel.findOne({ _id: idUsuario }).select(
      "-contrasenia"
    ); */
    const usuario = await UsuariosModel.findOne({ _id: idUsuario });

    if (!usuario) {
      return {
        msg: "ERROR en el ID. El usuario no existe",
        statusCode: 404,
      };
    }

    return {
      usuario,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
};

const registroUsuariosDb = async (body) => {
  body;
  try {
    const nuevoUsuario = new UsuariosModel(body);
    const nuevoCarrito = new CarritoModel();
    const nuevoFavorito = new FavoritosModel();

    nuevoUsuario.contrasenia = await argon.hash(nuevoUsuario.contrasenia);

    nuevoCarrito.idUsuario = nuevoUsuario._id;
    nuevoFavorito.idUsuario = nuevoUsuario._id;
    nuevoUsuario.idCarrito = nuevoCarrito._id;
    nuevoUsuario.idFavoritos = nuevoFavorito._id;

    const { info, rejected } = await registroExitoso(
      nuevoUsuario.emailUsuario,
      nuevoUsuario.nombreUsuario
    );

    if (info && !rejected.length) {
      await nuevoCarrito.save();
      await nuevoFavorito.save();
      await nuevoUsuario.save();

      return {
        msg: "Usuario creado con exito",
        statusCode: 201,
      };
    } else {
      return {
        msg: "ERROR al intentar crear el usuario",
        statusCode: 422,
      };
    }
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const actualizarUnUsuarioPorIdDb = async (idUsuario, body) => {
  try {
    const { contrasenia, ...usuario } = body;

    await UsuariosModel.findByIdAndUpdate(
      { _id: idUsuario },
      { body: usuario }
    );

    return {
      msg: "Usuario actualizado",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const eliminarUnUsuarioPorIdDb = async (idUsuario) => {
  try {
    await UsuariosModel.findByIdAndDelete({ _id: idUsuario });

    return {
      msg: "Usuario eliminado con exito",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const inicioSesionUsuarioDb = async (body) => {
  try {
    const usuarioExiste = await UsuariosModel.findOne({
      nombreUsuario: body.nombreUsuario,
    });

    if (!usuarioExiste) {
      return {
        msg: "ERROR. Usuario y/o contraseña  no coincide. USER",
        statusCode: 400,
      };
    }

    if (usuarioExiste.estado === "deshabilitado") {
      return {
        msg: "ERROR. Tu sesion no pudo iniciarse por que estas bloqueado. Comunicate con algun administrador",
        statusCode: 400,
      };
    }

    const confirmarContrasenia = await argon.verify(
      usuarioExiste.contrasenia,
      body.contrasenia
    );

    if (confirmarContrasenia) {
      const payload = {
        idUsuario: usuarioExiste._id,
        idCarrito: usuarioExiste.idCarrito,
        idFavorito: usuarioExiste.idFavoritos,
        nombreUsuario: usuarioExiste.nombreUsuario,
        rolUsuario: usuarioExiste.rol,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      return {
        msg: "Usuario Logueado",
        token,
        rolUsuario: usuarioExiste.rol,
        statusCode: 200,
      };
    } else {
      return {
        msg: "ERROR. Usuario y/o contraseña  no coincide. PASS",
        statusCode: 400,
      };
    }
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const habilitadDeshabilitarUsuarioDB = async (idUsuario) => {
  try {
    const usuario = await UsuariosModel.findOne({ _id: idUsuario });

    if (usuario.estado === "deshabilitado") {
      usuario.estado = "habilitado";
      await usuario.save();
      return {
        msg: "Usuario habilitado",
        statusCode: 200,
      };
    } else {
      usuario.estado = "deshabilitado";
      await usuario.save();
      return {
        msg: "Usuario deshabilitado",
        statusCode: 200,
      };
    }
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

module.exports = {
  obtenerTodosLosUsuariosDb,
  obtenerUnUsuarioPorIdDb,
  registroUsuariosDb,
  actualizarUnUsuarioPorIdDb,
  eliminarUnUsuarioPorIdDb,
  inicioSesionUsuarioDb,
  habilitadDeshabilitarUsuarioDB,
};
