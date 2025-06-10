const cloudinary = require("../helpers/cloudinary.config.helpers");
const ProductosModel = require("../model/productos.model");

const obtenerTodosLosProductosArray = async () => {
  try {
    const productos = await ProductosModel.find();
    return {
      productos,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const obtenerUnProductoPorIdArray = async (idProducto) => {
  try {
    const producto = await ProductosModel.findOne({ _id: idProducto });

    if (!producto) {
      return {
        msg: "ERROR. Producto no existe",
        statusCode: 404,
      };
    }

    return {
      producto,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const crearNuevoProductoArray = async (body, req) => {
  try {
    const nuevoProducto = new ProductosModel(body);
    nuevoProducto.save();
    /*     const imagen = await cloudinary.uploader.upload(req.file.path);
    nuevoProducto.imagen = imagen.secure_url;
    await nuevoProducto.save(); */

    return {
      msg: "Producto creado con exito",
      statusCode: 201,
      idProducto: nuevoProducto._id,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const agregarImagenDB = async (idProducto, file) => {
  const producto = await ProductosModel.findOne({ _id: idProducto });
  producto.imagen = file.path;
  await producto.save();

  return {
    mag: "imagen se cargo correctamente",
    statusCode: 200,
  };

  /*   const imagen = await cloudinary.uploader.upload(req.file.path);
  nuevoProducto.imagen = imagen.secure_url;
  await nuevoProducto.save(); */
};

const actualizarProductoPorIdArray = async (idProducto, body) => {
  try {
    await ProductosModel.findByIdAndUpdate({ _id: idProducto }, body);

    return {
      msg: "Producto actualizado con exito",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const borrarUnProductoPorIdArray = async (idProducto) => {
  try {
    const productoExiste = await ProductosModel.findOne({ _id: idProducto });

    if (!productoExiste) {
      return {
        msg: "ERROR ID. Producto no existe",
        statusCode: 404,
      };
    }

    await ProductosModel.findByIdAndDelete({ _id: idProducto });

    return {
      msg: "Producto eliminado con exito",
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
  obtenerTodosLosProductosArray,
  obtenerUnProductoPorIdArray,
  crearNuevoProductoArray,
  actualizarProductoPorIdArray,
  borrarUnProductoPorIdArray,
  agregarImagenDB,
};
