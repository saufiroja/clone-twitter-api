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

    const tweet = await Tweet.findByPk(tweetId);
    if (!tweet) {
      return next(createError(404, 'tweet not found'));
    }

    let like = await Like.findOne({
      where: { [Op.and]: [{ userId, tweetId }] },
    });

    if (!like) {
      let newLike = await Like.create({
        userId,
        tweetId,
      });
      return res.status(201).json({
        message: 'successfully like tweet',
        code: 201,
        like: newLike,
      });
    } else {
      await like.destroy();
      return res.status(200).json({
        message: 'successfully unlike tweet',
        code: 200,
      });
    }
  } catch (error) {
    next(error);
  }
};
