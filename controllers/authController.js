const { userModel } = require("../models/index");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const user = await userModel.getUserByEmail(req.body.email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const user = await userModel.createUser(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  res.json({ message: "User logged out" });
};

module.exports = {
  login,
  register,
  logout,
};
// Path: models/userModel.js
