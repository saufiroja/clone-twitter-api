const router = require('express').Router();

const {
  createTweet,
  findAllTweets,
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
const { upload } = require('../middlewares/multer.middlewares');

router.get('/home/tweets', veirfyUser, findAllTweets);
router.get('/user/tweets', veirfyUser, findAllTweetUser);

router.post(
  '/user/tweets',
  veirfyUser,
  validate(tweetSchema),
  upload.single('image'),
  createTweet
);
router.delete('/user/tweets/:id', veirfyUser, deleteTweet);

router.post(
  '/:id/comments',
  veirfyUser,
  validate(commentSchema),
  createComment
);
router.delete('/:id/:id', veirfyUser, deleteComment);

module.exports = router;
