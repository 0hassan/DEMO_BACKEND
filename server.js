const express = require("express");
const app = require("./app");
const mongoose = require("mongoose");
const port = 3000;
const process = require("process");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/demoBackEnd")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error:", error);
  });

// Start the server
server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
