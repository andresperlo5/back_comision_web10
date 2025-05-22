const CarritoModel = require("../model/carritos.model");
const ProductosModel = require("../model/productos.model");

const agregarProductoAlCarritoBD = async (idCarrito, idProducto) => {
  try {
    const carrito = await CarritoModel.findOne({ _id: idCarrito });
    const producto = await ProductosModel.findOne({ _id: idProducto });

    const productoExisteCarrito = carrito.productos.find(
      (prod) => prod._id.toString() === producto._id.toString()
    );

    if (productoExisteCarrito) {
      return {
        msg: "Producto ya existe en el carrito",
        statusCode: 409,
      };
    }

    carrito.productos.push(producto);
    console.log(carrito);
    await carrito.save();

    return {
      msg: "Producto cargado con exito",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

module.exports = {
  agregarProductoAlCarritoBD,
};
