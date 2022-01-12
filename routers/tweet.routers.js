const router = require('express').Router();

const {
  createTweet,
  findAllTweet,
  findAllTweetUser,
  deleteTweet,
} = require('../controllers/tweet.controllers');
const {
  createComment,
  deleteComment,
} = require('../controllers/comment.controller');
const { veirfyUser } = require('../middlewares/jwt.middlewares');
const { validate } = require('../middlewares/joi/joi.middlewares');
const { tweetSchema } = require('../middlewares/joi/tweet.schema');
const { commentSchema } = require('../middlewares/joi/comment.schema');

router.get('/tweets', veirfyUser, findAllTweet);
router.get('/user/tweets', veirfyUser, findAllTweetUser);

router.post('/user/tweets', veirfyUser, validate(tweetSchema), createTweet);
router.delete('/user/tweets/:id', veirfyUser, deleteTweet);

router.post(
  '/:id/comments',
  veirfyUser,
  validate(commentSchema),
  createComment
);
router.delete('/:id/:id', veirfyUser, deleteComment);

module.exports = router;
