const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const { userServices } = require("../services");
const { User } = require("../models");
const dotenv = require("dotenv");
const { auth, requiresAuth } = require("express-openid-connect");

dotenv.config();

module.exports.auth = auth({
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.SECRET,
  clientSecret: process.env.CLIENT_SECRET,

  authorizationParams: {
    response_type: "code", // This requires you to provide a client secret
    audience: "https://dev-vk8f1oa2fnt1m70d.us.auth0.com/api/v2/",
    scope: "openid profile email read:products",
  },
});

module.exports.requiresAuth = requiresAuth;

// module.exports = async (req, res, next) => {
//   try {
//     // Get token from header
//     const token = req.headers.authorization.replace("Bearer ", "");

//     // Check if not token
//     if (!token) {
//       return res
//         .status(httpStatus.UNAUTHORIZED)
//         .json({ message: "No token, authorization denied" });
//     }

//     // Verify token

//     const decoded = jwt.verify(token, "demoProject");
//     req.userData = decoded;

//     // Extract user ID from decoded token
//     const userId = decoded._id;

//     // Retrieve user details from the database
//     const user = await User.findById({ _id: userId });

//     // Check if Token is Valid
//     if (!user || user.token != token) {
//       return res
//         .status(httpStatus.UNAUTHORIZED)
//         .json({ message: "Token is not valid" });
//     }

//     // Attach user details to the request object
//     req.user = user;

//     next();
//   } catch (err) {
//     console.log(err);
//     res.status(httpStatus.UNAUTHORIZED).json({ message: "Token is not valid" });
//   }
// };
