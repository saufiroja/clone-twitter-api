const createError = require('http-errors');

const { Retweet, User } = require('../database/models');

exports.addRetweets = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const tweetId = req.query.id;
    if (!userId) {
      return next(createError(401, 'unauthorized'));
    }

    const [retweet, created] = await Retweet.findOrCreate({
      where: { tweetId },
      defaults: { userId },
    });

    if (!created) {
      return next(createError(400, 'Tweet is already retweeted by user'));
    }

    return res.status(201).json({
      message: 'successfully add retweet',
      code: 201,
      retweet,
    });
  } catch (error) {
    next(error);
  }
};

exports.removeRetweet = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const retweetId = req.params.id;
    if (!userId) {
      return next(createError(401, 'unauthorized'));
    }

    const unRetweet = await Retweet.destroy({ where: { id: retweetId } });

    if (unRetweet == 0) {
      return next(createError(400, 'Tweet is already unretweeted by user'));
    }

    return res.status(200).json({
      message: 'successfully remove retweet',
      code: 200,
      unRetweet,
    });
  } catch (error) {
    next(error);
  }
};

exports.getTweetRetweet = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const tweetId = req.query.id;
    if (!userId) {
      return next(createError(401, 'unauthorized'));
    }
    const retweets = await User.findAll({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      include: {
        model: Retweet,
        where: {
          tweetId,
        },
      },
    });

    return res.status(200).json({
      message: 'successfully get tweet retweet',
      code: 200,
      retweets,
    });
  } catch (error) {
    next(error);
  }
};
