const express = require("express");
const router = express.Router();
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");

const defaultRoutes = [
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/users",
    route: userRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
