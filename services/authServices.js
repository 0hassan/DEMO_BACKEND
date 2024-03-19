// Description: This file contains the services for authentication. It includes the
// following functionalities:
// 1. login
// 2. register
// 3. logout
// 4. forgotPassword
// 5. resetPassword
//

const { User, OTP } = require("../models");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError");
const userServices = require("./userServices");

/**
 * Login with email and password
 * @param {Object} body
 * @param {Function} next
 * @returns {Promise<User>}
 */
const login = async (body, next) => {
  try {
    const user = await userServices.getUserByEmail(body.email);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    const isPasswordMatch = await user.isPasswordMatch(body.password);
    if (!isPasswordMatch) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
    }
    await user.generateAuthToken();
    return user;
  } catch (error) {
    next(error);
  }
};

/**
 * Register a new user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const register = async (userBody) => {
  try {
    const user = await User.create(userBody);
    return user;
  } catch (err) {
    console.log(err);
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
};

// Logout user
// @param {string} userId
// @returns {Promise<User>}
const logout = async (userId) => {
  try {
    const user = await User.findById(userId);
    user.token = "";
    await user.save();
    return user;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error logging out");
  }
};

module.exports = {
  login,
  register,
  logout,
};
