const createError = require('http-errors');

const { Tweet } = require('../database/models');

// POST TWEET
exports.createTweet = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { body, image } = req.body;
    if (!id) {
      return next(createError(401, 'unauthorized'));
    }

    const tweet = await Tweet.create({
      body,
      image,
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
