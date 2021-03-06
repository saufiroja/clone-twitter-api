const createError = require('http-errors');
const { Op } = require('sequelize');

const { User, Tweet, Follow } = require('../database/models');

// GET USER QUERY
exports.getQueryUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { name } = req.query;
    if (!id) {
      return next(createError(401, 'unauthorized'));
    }

    const profile = await User.findOne({
      where: { name },
      attributes: ['name', 'username', 'password'],
      include: { model: Tweet },
    });

    if (!profile) {
      return next(createError(404, 'user not found'));
    }

    return res.status(200).json({
      message: 'successfully get name user',
      code: 200,
      user: profile,
    });
  } catch (error) {
    next(error);
  }
};

// GET USER
exports.getProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { username } = req.params;
    if (!id) {
      return next(createError(401, 'unauthorized'));
    }

    const user = await User.findOne({
      where: { username },
      attributes: {
        exclude: ['password', 'updatedAt'],
      },
      include: { model: Tweet },
    });

    if (!user) {
      return next(createError(404, 'user not found'));
    }

    const countTweet = await Tweet.count();
    const countFollowers = await Follow.findAll({
      where: { followers: user.id },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    const countFollowing = await Follow.findAll({
      where: { following: user.id },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    let isFollow = await Follow.findOne({
      where: { [Op.and]: [{ followers: user.id, following: id }] },
    });

    return res.status(200).json({
      message: 'successfully get all profile',
      code: 200,
      user,
      countTweet,
      countFollowers,
      countFollowing,
      isFollow: isFollow ? true : false,
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

    const user = await User.findOne({
      where: { id },
      attributes: ['name', 'username', 'email'],
      include: { model: Tweet },
    });
    if (!user) {
      return next(createError(404, 'user not found'));
    }

    // const countTweet = await Tweet

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
    const { name, bio } = req.body;
    const { originalname } = req.file;
    if (!id) {
      return next(createError(401, 'unauthorized'));
    }

    const user = await User.update(
      {
        name,
        bio,
        avatar: originalname,
      },
      { where: { id } }
    );
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
