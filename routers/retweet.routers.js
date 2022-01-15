const router = require('express').Router();

const {
  addRetweets,
  removeRetweet,
  getTweetRetweet,
} = require('../controllers/retweet.controllers');
const { veirfyUser } = require('../middlewares/jwt.middlewares');

router.post('/retweet/add', veirfyUser, addRetweets);
router.delete('/retweet/remove/:id', veirfyUser, removeRetweet);
router.get('/retweet/tweet', veirfyUser, getTweetRetweet);

module.exports = router;
