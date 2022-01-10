const bcrypt = require('bcrypt');
const createError = require('http-errors');

const { User } = require('../database/models');
const {
  genereteAccessToken,
  generateRefreshToken,
} = require('../middlewares/token.middleware');

// SIGNUP
exports.signup = async (req, res, next) => {
  try {
    const { name, username, email, password, gender } = req.body;

    // check email
    const isEmail = await User.findOne({ where: { email } });
    if (isEmail) {
      return next(createError(400, 'email already exists'));
    }

    // check username
    const isUsername = await User.findOne({ where: { username } });
    if (isUsername) {
      return next(createError(400, 'username already exists'));
    }

    // NEW USER
    const user = await User.create({
      name,
      username,
      email,
      password,
      gender,
      isAdmin: false,
    });

    const refreshToken = await generateRefreshToken(user.id);
    const accessToken = genereteAccessToken(user);

    return res.status(201).json({
      message: 'successfully signup user',
      code: 201,
      user,
      accessToken,
      refreshToken: refreshToken.refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if the email entered is correct!
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(createError(400, 'invalid email'));
    }

    // check if the password entered is correct!
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(createError(400, 'invalid password'));
    }

    const refreshToken = await generateRefreshToken(user.id);
    const accessToken = genereteAccessToken(user);

    return res.status(200).json({
      message: 'successfully login user',
      code: 200,
      user,
      accessToken,
      refreshToken: refreshToken.refreshToken,
    });
  } catch (error) {
    next(error);
  }
};
