const multer = require("multer");
const path = require("path");

module.exports = multer({
  /*  storage: multer.diskStorage({}), uso de cloudinary*/
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public");
    },
    filename: (req, file, cb) => {
      const nombreImagen = file.fieldname;
      const ext = path.extname(file.originalname);
      const imagenFinal = `${nombreImagen}-${Date.now()}${ext}`;

      cb(null, imagenFinal);
    },
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    if (ext !== ".jpg" && ext !== ".png") {
      cb(new Error("Fomarto incorrecto"), false);
    }

    cb(null, true);
  },
});
