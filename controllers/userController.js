const httpStatus = require("http-status");
const userServices = require("../services/userServices");
const catchAsync = require("../utils/catchAsync");

const getAllUsers = catchAsync(async (req, res) => {
  const users = await userServices.getAllUsers();
  res.json(users);
});

const getUserById = async (req, res) => {};

const createUser = catchAsync(async (req, res) => {
  const user = await userServices.createUser(req.body);
  res.status(httpStatus.CREATED).json(user);
});

const updateUser = async (req, res) => {};

const deleteUser = async (req, res) => {};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
