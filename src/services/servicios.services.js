const { MercadoPagoConfig, Preference } = require("mercadopago");
const UsuariosModel = require("../model/usuarios.model");
const jwt = require("jsonwebtoken");
const argon = require("argon2");
const { recoveryPassEmail } = require("../helpers/messages.helpers");

const mercadoPagoConfigServices = async (carrito) => {
  try {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });

    const preference = new Preference(client);
    const res = await preference.create({
      body: {
        items: [
          {
            id: "1234",
            title: "Dummy Title",
            description: "Dummy description",
            picture_url: "https://www.myapp.com/myimage.jpg",
            category_id: "car_electronics",
            quantity: 1,
            currency_id: "ARS",
            unit_price: 2500,
          },
          {
            id: "5678",
            title: "Dummy 2 Title",
            description: "Dummy description 2",
            picture_url: "https://www.myap2p.com/myimage.jpg",
            category_id: "car_electronics2",
            quantity: 3,
            currency_id: "ARS",
            unit_price: 3000,
          },
        ],
        back_urls: {
          success: `${process.env.FRONT_URL}/user/cart?success`,
          failure: `${process.env.FRONT_URL}/user/cart?failure`,
          pending: `${process.env.FRONT_URL}/user/cart?pending`,
        },
      },
    });

    console.log(res);

    /*     return {
      msg: "Compra pagada con exito",
      urlRes: res.init_point,
      statusCode: 200,
    }; */

    return {
      msg: "Compra pagada con exito",
      urlRes: res.id,
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

const sendEmailRecoveryPassUserServices = async (emailUsuario) => {
  try {
    const usuario = await UsuariosModel.findOne({ emailUsuario });
    if (!usuario) {
      return {
        msg: "Problema al intentar buscar el usuario",
        statusCode: 404,
      };
    }

    const payload = {
      idUsuario: usuario._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_RECOVERY_PASS);

    await recoveryPassEmail(emailUsuario, token);

    return {
      msg: "Envio del correo fue exitoso",
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

const changePassUserServices = async (token, nuevaContrasenia) => {
  try {
    const verificarUsuario = jwt.verify(
      token,
      process.env.JWT_SECRET_RECOVERY_PASS
    );
    const usuario = await UsuariosModel.findOne({
      _id: verificarUsuario.idUsuario,
    });

    if (!usuario) {
      return {
        msg: "Problema al buscar al usuario",
        statusCode: 404,
      };
    }

    const nuevaContraseHash = await argon.hash(nuevaContrasenia);

    usuario.contrasenia = nuevaContraseHash;

    await usuario.save();

    return {
      msg: "Contraseña cambiada con exito",
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

module.exports = {
  mercadoPagoConfigServices,
  sendEmailRecoveryPassUserServices,
  changePassUserServices,
};
