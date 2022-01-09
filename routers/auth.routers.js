const router = require('express').Router();

const { signup, login } = require('../controllers/auth.controllers');
const { veirfyUser } = require('../middlewares/jwt.middlewares');
const { signupSchema, loginSchema } = require('../middlewares/joi/auth.schema');
const { validate } = require('../middlewares/joi/joi.middlewares');

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);

router.get('/whoami', veirfyUser, (req, res) => {
  return res.send('hello');
});

module.exports = router;
