const express = require("express");
const router = express.Router();

// Path: controllers/userController.js
const { userController } = require("../controllers/index");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
