const router = require('express').Router();

const { followUser } = require('../controllers/follow.controllers');
const { veirfyUser } = require('../middlewares/jwt.middlewares');

router.post('/user/follow', veirfyUser, followUser);

module.exports = router;
