const router = require('express').Router();

const { createTweet } = require('../controllers/tweet.controllers');
const { veirfyUser } = require('../middlewares/jwt.middlewares');
const { validate } = require('../middlewares/joi/joi.middlewares');
const { tweetSchema } = require('../middlewares/joi/tweet.schema');

router.post('/tweet', veirfyUser, validate(tweetSchema), createTweet);

module.exports = router;
