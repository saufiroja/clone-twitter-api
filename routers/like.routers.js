const router = require('express').Router();

const { veirfyUser } = require('../middlewares/jwt.middlewares');
const {
  createLike,
  getTweetLikes,
} = require('../controllers/like.controllers');

router.post('/like/add', veirfyUser, createLike);
router.get('/like/get-likes', veirfyUser, getTweetLikes);

module.exports = router;
