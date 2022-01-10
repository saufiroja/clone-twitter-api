const router = require('express').Router();

const {
  createTweet,
  findAllTweet,
  findAllTweetUser,
  deleteTweet,
} = require('../controllers/tweet.controllers');
const { veirfyUser } = require('../middlewares/jwt.middlewares');
const { validate } = require('../middlewares/joi/joi.middlewares');
const { tweetSchema } = require('../middlewares/joi/tweet.schema');

router.get('/tweets', veirfyUser, findAllTweet);

router.post('/user/tweets', veirfyUser, validate(tweetSchema), createTweet);
router.get('/user/tweets', veirfyUser, findAllTweetUser);
router.delete('/user/tweets/:id', veirfyUser, deleteTweet);

module.exports = router;
