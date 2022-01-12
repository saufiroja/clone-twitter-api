const Joi = require('joi');

const tweetSchema = Joi.object({
  body: Joi.string().optional(),
  image: Joi.string().optional(),
});

module.exports = { tweetSchema };
