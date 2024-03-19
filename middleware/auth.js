const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const { userServices } = require("../services");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  // Get token from header
  const token = req.headers.authorization.replace("Bearer ", "");

  // Check if not token
  if (!token) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, "demoProject");
    req.userData = decoded;

    // Extract user ID from decoded token
    const userId = decoded._id;

    // Retrieve user details from the database
    const user = await User.findById({ _id: userId });

    // Check if Token is Valid
    if (!user || user.token != token) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Token is not valid" });
    }

    // Attach user details to the request object
    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    res.status(httpStatus.UNAUTHORIZED).json({ message: "Token is not valid" });
  }
};
