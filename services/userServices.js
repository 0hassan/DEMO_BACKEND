const mongoose = require("mongoose");
const { User, OTP } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");

/**
 * Get all users
 * @returns {Promise<User[]>}
 */
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

/**
 * Create a new user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  try {
    const user = await User.create(userBody);
    return user;
  } catch (err) {
    console.log(err);
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
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

/**
 * Get user by id
 * @param {string} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return user;
  } catch (error) {
    throw error; // Re-throw the error to propagate it further
  }
};

/**
 * Update user by email
 * @param {string} email
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
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

/**
 * Delete user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const deleteUser = async (email) => {
  try {
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User Does Not Exist");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  getUserById,
};
