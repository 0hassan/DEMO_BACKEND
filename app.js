const express = require("express");
const app = express();
// const routes = require("./routes");

// Routes
// app.use("/", routes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Path: app.js
module.exports = app;
