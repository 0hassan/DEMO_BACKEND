const Joi = require("joi");
const { password } = require("./customValidation");

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
  }),
};

const getUsers = {};

const getUser = {
  params: Joi.object().keys({
    user_id: Joi.string().required(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    email: Joi.string().email(),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
