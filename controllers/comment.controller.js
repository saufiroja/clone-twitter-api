const createError = require('http-errors');
const { Comment } = require('../database/models');

exports.createComment = async (req, res, next) => {
  try {
    const { body } = req.body;
    const userId = req.user.id;
    const tweetId = req.params.id;

    if (!userId) {
      return next(createError(400, 'unauthorized'));
    }
    if (!tweetId) {
      return next(createError(400, 'tweet not found'));
    }

    const comment = await Comment.create({
      body,
      userId,
      tweetId,
    });

    return res.status(201).json({
      message: 'successfully submit comment',
      code: 201,
      comment,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const tweetId = req.params.id;

    if (!userId) {
      return next(createError(400, 'unauthorized'));
    }
    if (!tweetId) {
      return next(createError(400, 'tweet not found'));
    }

    const comment = await Comment.destroy({ where: { id: tweetId } });
    return res.status(201).json({
      message: 'successfully delete comment',
      code: 201,
      comment,
    });
  } catch (error) {
    next(error);
  }
};
