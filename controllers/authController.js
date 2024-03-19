// Description for the auth controller file is as follows:
// Description: This file contains the controllers for authentication. It includes the
// following functionalities:
// 1. login
// 2. register
// 3. logout
// 4. forgotPassword
// 5. resetPassword
//

const { User, OTP } = require("../models");
const bcrypt = require("bcrypt");
const { authServices } = require("../services");
const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");
const { userServices } = require("../services");

// login
// /auth/login
// Public
// Description: This function is used to log in a user. It takes the user's email and
// password as input and returns the user and a token.
// req.body: email, password
const login = catchAsync(async (req, res, next) => {
  try {
    const user = await authServices.login(req.body, next);
    return res.json(user);
  } catch (error) {
    next(error);
  }
});

// register
// /auth/register
// Public
// Description: This function is used to register a new user. It takes the user's email and
// password as input and returns the user.
// req.body: email, password, name
const register = catchAsync(async (req, res, next) => {
  try {
    const user = await authServices.register(req.body);
    res.status(httpStatus.CREATED).json(user);
  } catch (error) {
    next(error);
  }
});

// logout
// /auth/logout
// Private
// Description: This function is used to log out a user. It takes no input and returns a
// message.
const logout = catchAsync(async (req, res, next) => {
  try {
    const user = await authServices.logout(req.userData._id);
    res.json({ message: "Logged out" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// forgotPassword
// /auth/forgotPassword
// Public
// Description: This function is used to send an OTP to the user's email. It takes the
// user's email as input and returns a message.
// req.body: email
const forgotPassword = catchAsync(async (req, res, next) => {
  try {
    const user = await userServices.getUserByEmail(req.body.email);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpDoc = await OTP.findOne({ email: user.email });
    if (otpDoc) {
      await OTP.findOneAndUpdate({ email: user.email }, { otp });
    } else {
      await OTP.create({ email: user.email, otp });
    }
    res.json({ message: "OTP sent to email: " + otp });
  } catch (error) {
    console.log(error);
    next(new ApiError(httpStatus.BAD_REQUEST, "Error sending OTP"));
  }
});

// resetPassword
// /auth/reset-password
// Public
// Description: This function is used to reset the user's password. It takes the user's
// email, OTP, and new password as input and returns a message.
// req.body: email, otp, newPassword
const resetPassword = catchAsync(async (req, res, next) => {
  try {
    const otpDoc = await OTP.findOne({ email: req.body.email });
    if (!otpDoc) {
      throw new ApiError(httpStatus.NOT_FOUND, "OTP not found");
    }
    if (otpDoc.otp != req.body.otp) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect OTP");
    }

    // update user password
    const user = await userServices.updateUser(req.body.email, {
      password: req.body.newPassword,
    });

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = {
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
};
// Path: models/userModel.js
