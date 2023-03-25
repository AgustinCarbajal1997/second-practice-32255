const mongoose = require("mongoose");

mongoose
  .connect("")
  .then(() => console.log("Successfull connections to db"))
  .catch((error) => console.log(`Something went wrong ${error}`));
