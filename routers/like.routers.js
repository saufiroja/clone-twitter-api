const router = require('express').Router();

const { veirfyUser } = require('../middlewares/jwt.middlewares');
const { createLike } = require('../controllers/like.controllers');

router.post('/:id/like', veirfyUser, createLike);

module.exports = router;
