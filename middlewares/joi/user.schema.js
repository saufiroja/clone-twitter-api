const Joi = require('joi');

const updateSchema = Joi.object({
  name: Joi.string().optional(),
  bio: Joi.optional(),
  avatar: Joi.string().optional(),
});

module.exports = { updateSchema };
