const Joi = require('joi');

const signupSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  gender: Joi.string().valid('Female', 'Male').required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

module.exports = { signupSchema, loginSchema };
