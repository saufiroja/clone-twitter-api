const router = require('express').Router();

const {
  getProfile,
  getProfileUser,
  updateUser,
} = require('../controllers/user.controllers');
const { veirfyUser } = require('../middlewares/jwt.middlewares');
const { updateSchema } = require('../middlewares/joi/user.schema');
const { validate } = require('../middlewares/joi/joi.middlewares');
router.get('/', veirfyUser, getProfile);
router.get('/profile', veirfyUser, getProfileUser);

router.put(
  '/setting/edit-profile',
  validate(updateSchema),
  veirfyUser,
  updateUser
);

module.exports = router;
