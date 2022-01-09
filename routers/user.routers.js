const router = require('express').Router();

const {
  getProfile,
  getProfileUser,
} = require('../controllers/user.controllers');
const { veirfyUser } = require('../middlewares/jwt.middlewares');

router.get('/', veirfyUser, getProfile);
router.get('/profile', veirfyUser, getProfileUser);

module.exports = router;
