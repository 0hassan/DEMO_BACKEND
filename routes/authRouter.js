const express = require("express");
const router = express.Router();

// Path: controllers/authController.js
const { authController } = require("../controllers/index");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
