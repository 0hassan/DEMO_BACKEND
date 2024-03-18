const httpStatus = require("http-status");
const userServices = require("../services/userServices");
const catchAsync = require("../utils/catchAsync");

// Get all users
// GET /users
// Public
const getAllUsers = catchAsync(async (req, res, next) => {
  try {
    const users = await userServices.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Get user by email
// GET /users/:email
// Public
const getUserByEmail = async (req, res, next) => {
  try {
    const user = await userServices.getUserByEmail(req.params.email);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Create a new user
// POST /users
// Public
const createUser = catchAsync(async (req, res, next) => {
  try {
    const user = await userServices.createUser(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Update user by email
// PUT /users/:email
// Public
const updateUser = async (req, res, next) => {
  try {
    const user = await userServices.updateUser(req.params.email, req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Delete user by email
// DELETE /users/:email
// Public
const deleteUser = async (req, res, next) => {
  try {
    await userServices.deleteUser(req.params.email);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

// Export the functions
module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
