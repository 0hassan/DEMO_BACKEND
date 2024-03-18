const mongoose = require("mongoose");
const { User, OTP } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Error fetching users"
    );
  }
};

const createUser = async (userBody) => {
  try {
    const user = await User.create(userBody);
    return user;
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return user;
  } catch (error) {
    throw error; // Re-throw the error to propagate it further
  }
};

// Update user by email
const updateUser = async (email, updateBody) => {
  const user = await getUserByEmail(email);
  // Validate if email is already taken
  if (
    updateBody.email &&
    (await User.isEmailTaken(updateBody.email, user.id))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

module.exports = {
  getAllUsers,
  createUser,
  getUserByEmail,
  updateUser,
};
