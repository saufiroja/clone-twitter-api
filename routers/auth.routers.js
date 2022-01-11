const router = require('express').Router();

const { signup, login } = require('../controllers/auth.controllers');
const { signupSchema, loginSchema } = require('../middlewares/joi/auth.schema');
const { validate } = require('../middlewares/joi/joi.middlewares');

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);

module.exports = router;
