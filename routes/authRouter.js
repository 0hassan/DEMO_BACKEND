const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");

// Path: controllers/authController.js
const { authController } = require("../controllers/index");

router.route("/login").post(authController.login);
router.route("/register").post(authController.register);
router.route("/logout").post(authController.logout);

module.exports = router;
