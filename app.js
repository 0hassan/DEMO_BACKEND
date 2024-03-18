const express = require("express");
const app = express();
const routes = require("./routes");

// Routes
app.use("/", routes);

// Path: app.js
module.exports = app;
