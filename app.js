const express = require("express");
const router = require("./router/index");
const initializePassport = require("./config/passport.config");
require("./config/mongo.config");
const app = express();
app.use(express.json());
initializePassport();

app.use("/", router);

module.exports = app;
