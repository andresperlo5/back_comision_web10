//require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3001;
const cors = require("cors");
const path = require("path");
const fs = require("fs");

//dataBase
require("./src/db/config.db");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
//C://user/desktop/carpeta/img
//C://user/desktop/proyecto/public
//C:// \\
/* app.use(
  fs.existsSync(express.static(path.join(__dirname, "public")))
    ? express.static(path.join(__dirname, "public"))
    : fs.mkdirSync("public")
); */
app.use("/public", express.static(path.join(__dirname, "public")));

//routes
app.use("/api", require("./src/routes/index.routes"));

app.listen(port, () => {
  console.log("Servidor andando en el puerto", port);
});
