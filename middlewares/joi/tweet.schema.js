const Joi = require('joi');

const tweetSchema = Joi.object({
  body: Joi.string().required(),
  image: Joi.string().optional(),
});

module.exports = { tweetSchema };
