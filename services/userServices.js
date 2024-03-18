const mongoose = require("mongoose");
const { User, OTP } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");

const getAllUsers = async () => {
  const users = await User.find();
  if (!users) {
    throw new ApiError(httpStatus.NOT_FOUND, "Users not found");
  }
  return users;
};

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  const user = await User.create(userBody);
  return user;
};

module.exports = {
  getAllUsers,
  createUser,
};
