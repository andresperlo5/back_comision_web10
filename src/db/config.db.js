const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => console.log("La db esta conectada"))
  .catch((error) => console.log(error));
