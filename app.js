const express = require("express");
const app = express();
const routes = require("./routes");
const httpStatus = require("http-status");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const apiErrorHandler = require("./middleware/apiErrorHandler");

// Secure apps by setting various HTTP headers
app.use(helmet());

// Parse JSON and url-encoded query
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sanitize data
app.use(xss());
app.use(mongoSanitize());

// Compress requests
app.use(compression());

// Enable CORS - Cross Origin Resource Sharing
app.use(cors());
app.options("*", cors());

// Routes
app.use("/", routes);

// send back a 500 error for any internal errors
app.use(apiErrorHandler);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({ message: "Not found" });
});

module.exports = app;
