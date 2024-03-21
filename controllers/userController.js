const httpStatus = require("http-status");
const { userServices } = require("../services/index");
const catchAsync = require("../utils/catchAsync");

const auth0utils = require("../utils/auth0utils");
const auth0lib = require("../utils/auth0lib");

// Get all users
// GET /users
// Public
const getAllUsers = catchAsync(async (req, res, next) => {
  try {
    // const users = await userServices.getAllUsers();
    const users = await auth0utils.getUsers();
    // const users = await auth0lib.getUsers();
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
    // const user = await userServices.getUserByEmail(req.params.email);
    const user = await auth0utils.getAUser("auth0|65fa79dcb5436c9c9273b002");
    // const user = await auth0lib.getAUser();
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
    const user1 = await userServices.createUser(req.body);
    const user = await auth0lib.createUser(req.body);
    auth0utils.changePassword(req.body.email);
    res.json(user1);
  } catch (error) {
    console.log(error);
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
    const user1 = await userServices.deleteUser(req.params.email);
    const user = await auth0lib.deleteUser("auth0|65fc0d7fc16d359feea4af19");

    res.status(httpStatus.NO_CONTENT).send("Deleted successfully");
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
