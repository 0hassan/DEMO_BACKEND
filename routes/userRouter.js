const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const { userValidation } = require("../validations");
const auth = require("../middleware/auth");

// Path: controllers/userController.js
const { userController } = require("../controllers/index");

router
  .route("/:email")
  .get(validate(userValidation.getUser), auth, userController.getUserByEmail)
  .put(auth, userController.updateUser)
  .delete(auth, userController.deleteUser);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(validate(userValidation.createUser), userController.createUser);

module.exports = router;
