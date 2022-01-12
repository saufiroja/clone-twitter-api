const createError = require('http-errors');

const { Tweet, Comment } = require('../database/models');

// POST TWEET USER
exports.createTweet = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { body } = req.body;
    const { originalname } = req.file;
    if (!id) {
      return next(createError(401, 'unauthorized'));
    }

    const tweet = await Tweet.create({
      body,
      image: originalname,
      userId: id,
    });

    return res.status(201).json({
      message: 'successfully create tweet',
      code: 201,
      tweet,
    });
  } catch (error) {
    next(error);
  }
};

// FIND ALL TWEET FROM USER
exports.findAllTweetUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    if (!id) {
      return next(createError(401, 'unauthorized'));
    }

    const tweet = await Tweet.findAll({
      where: { userId: id },
      include: { model: Comment, attributes: ['body', 'userId', 'tweetId'] },
    });
    return res.status(200).json({
      message: 'successfully find all tweet from user',
      code: 200,
      tweet,
    });
  } catch (error) {
    next(error);
  }
};

// FIND ALL TWEET
exports.findAllTweet = async (req, res, next) => {
  try {
    const { id } = req.user;
    if (!id) {
      return next(createError(401, 'unauthorized'));
    }

    const tweet = await Tweet.findAll({
      include: { model: Comment, attributes: ['body', 'userId', 'tweetId'] },
    });
    return res.status(200).json({
      message: 'successfully find all tweet',
      code: 200,
      tweet,
    });
  } catch (error) {
    next(error);
  }
};

// DELET TWEET FROM USER
exports.deleteTweet = async (req, res, next) => {
  try {
    const { id } = req.user;
    const tweetId = req.params.id;
    if (!id) {
      return next(createError(401, 'unauthorized'));
    }

    if (!tweetId) {
      return next(createError(404, 'tweet not found'));
    }

    const tweet = await Tweet.destroy({ where: { id: tweetId } });

    return res.status(200).json({
      message: 'successfully delete tweet from user',
      code: 200,
      tweet,
    });
  } catch (error) {
    next(error);
  }
};
