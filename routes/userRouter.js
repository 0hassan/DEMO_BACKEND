const express = require("express");
const router = express.Router();

// Path: controllers/userController.js
const { userController } = require("../controllers/index");

router
  .route("/:email")
  .get(userController.getUserByEmail)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

module.exports = router;
