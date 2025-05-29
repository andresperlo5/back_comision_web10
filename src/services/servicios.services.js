const { MercadoPagoConfig, Preference } = require("mercadopago");

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
          success: "http://localhost:5173/success",
          failure: "http://localhost:5173/failure",
          pending: "http://localhost:5173/pending",
        },
      },
    });

    console.log(res);

    return {
      msg: "Compra pagada con exito",
      urlRes: res.init_point,
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

module.exports = mercadoPagoConfigServices;
