const createError = require('http-errors');
const { Op } = require('sequelize');

const { Like, Tweet, User } = require('../database/models');

exports.createLike = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const tweetId = req.query.id;
    if (!userId) {
      return next(createError(401, 'unauthorized'));
    }

    const tweet = await Tweet.findByPk(tweetId);
    if (!tweet) {
      return next(createError(404, 'tweet not found'));
    }

    let like = await Like.findOne({
      where: { [Op.and]: [{ userId, tweetId }] },
    });

    if (!like) {
      // ADD LIKES
      let newLike = await Like.create({
        userId,
        tweetId,
      });
      await Tweet.increment('likesCount', {
        by: 1,
        where: { id: tweetId },
      });
      return res.status(201).json({
        message: 'successfully like tweet',
        code: 201,
        like: newLike,
      });
    } else {
      // ADD UNLIKE
      await like.destroy();
      await Tweet.decrement('likesCount', {
        by: 1,
        where: { id: tweetId },
      });
      return res.status(200).json({
        message: 'successfully unlike tweet',
        code: 200,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getTweetLikes = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const tweetId = req.query.id;

    if (!userId) {
      return next(createError(401, 'unauthorized'));
    }

    const likes = await User.findAll({
      attributes: ['name', 'username', 'avatar'],
      include: {
        model: Like,
        attributes: ['id'],
        where: {
          tweetId,
        },
      },
    });

    return res.status(200).json({
      message: 'successfully get all tweet like',
      code: 200,
      likes,
    });
  } catch (error) {
    next(error);
  }
};
