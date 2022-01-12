const router = require('express').Router();

const {
  getProfile,
  getProfileUser,
  updateUser,
  getQueryUser,
} = require('../controllers/user.controllers');
const { veirfyUser } = require('../middlewares/jwt.middlewares');
const { updateSchema } = require('../middlewares/joi/user.schema');
const { validate } = require('../middlewares/joi/joi.middlewares');
const { upload } = require('../middlewares/multer.middlewares');

router.get('/:name', veirfyUser, getProfile);
router.get('/profile', veirfyUser, getProfileUser);

router.get('/', veirfyUser, getQueryUser);

router.put(
  '/setting/edit-profile',
  validate(updateSchema),
  veirfyUser,
  upload.single('avatar'),
  updateUser
);

module.exports = router;
