const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const { authValidation } = require("../validations");
const auth = require("../middleware/auth");

// Path: controllers/authController.js
const { authController } = require("../controllers/index");

router
  .route("/login")
  .post(validate(authValidation.login), authController.login);
router
  .route("/register")
  .post(validate(authValidation.register), authController.register);
router
  .route("/logout")
  .post(validate(authValidation.logout), authController.logout);
router
  .route("/forgot-password")
  .post(validate(authValidation.forgotPassword), authController.forgotPassword);

router
  .route("/reset-password")
  .post(validate(authValidation.resetPassword), authController.resetPassword);

module.exports = router;
