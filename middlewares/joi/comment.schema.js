const Joi = require('joi');

const commentSchema = Joi.object({
  body: Joi.string().required(),
});

module.exports = { commentSchema };
