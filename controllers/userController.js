const httpStatus = require("http-status");
const userServices = require("../services/userServices");
const catchAsync = require("../utils/catchAsync");

const getAllUsers = catchAsync(async (req, res, next) => {
  try {
    const users = await userServices.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

const getUserByEmail = async (req, res, next) => {
  try {
    const user = await userServices.getUserByEmail(req.params.email);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const createUser = catchAsync(async (req, res, next) => {
  try {
    const user = await userServices.createUser(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

const updateUser = async (req, res, next) => {
  try {
    const user = await userServices.updateUser(req.params.email, req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await userServices.deleteUser(req.params.email);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
