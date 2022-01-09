const createError = require('http-errors');

const { User } = require('../database/models');

// GET PROFILE
exports.getProfile = async (req, res, next) => {
  try {
    const { user } = req;
    if (!user) {
      return next(createError(401, 'unauthorized'));
    }

    const profile = await User.findAll({
      attributes: ['firstName', 'lastName', 'username', 'email'],
    });
    return res.status(200).json({
      message: 'successfully get all profile',
      code: 200,
      user: profile,
    });
  } catch (error) {
    next(error);
  }
};

// GET PROFILE USER
exports.getProfileUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    if (!id) {
      return next(createError(401, 'unauthorized'));
    }

    const user = await User.findOne({ where: { id } });
    if (!userProfile) {
      return next(createError(404, 'user not found'));
    }

    return res.status(200).json({
      message: 'successfully get profile',
      code: 200,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE USER
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { firstName, lastName } = req.body;
    if (!id) {
      return next(createError(401, 'unauthorized'));
    }

    const user = await User.update({ firstName, lastName }, { where: { id } });
    if (!user) {
      return next(createError(404, 'user not found'));
    }

    return res.status(201).json({
      message: 'successfully update user',
      code: 201,
      user,
    });
  } catch (error) {
    next(error);
  }
};