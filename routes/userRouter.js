const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const { userValidation } = require("../validations");
const { auth, requiresAuth } = require("../middleware/auth");

// Path: controllers/userController.js
const { userController } = require("../controllers/index");

router
  .route("/:user_id")
  .get(validate(userValidation.getUser), userController.getUserByEmail)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router
  .route("/")
  .get(requiresAuth(), userController.getAllUsers)
  .post(validate(userValidation.createUser), userController.createUser);

module.exports = router;
