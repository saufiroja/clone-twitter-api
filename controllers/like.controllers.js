const createError = require('http-errors');
const { Op } = require('sequelize');

const { Like, Tweet } = require('../database/models');

exports.createLike = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const tweetId = req.params.id;
    if (!userId) {
      return next(createError(401, 'unauthorized'));
    }

    // const tweet = await Tweet.findOne({ where: { id: tweetId } });
    if (!tweetId) {
      return next(createError(404, 'tweet not found'));
    }

    const like = await Like.findOne({
      where: { [Op.and]: [{ userId, tweetId }] },
    });

    if (like) {
      return next(createError(400, 'the tweet has been liked'));
    }

    const newLike = await Like.create({
      userId,
      tweetId,
    });

    return res.status(201).json({
      message: 'successfully like tweet',
      code: 201,
      like: newLike,
    });
  } catch (error) {
    next(error);
  }
};
