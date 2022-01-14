const creatError = require('http-errors');
const { Op } = require('sequelize');

const { User, Follow } = require('../database/models');

exports.followUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.query;

    if (!userId) {
      return next(creatError(401, 'unautorized'));
    }

    const user = await User.findByPk(id);

    if (userId === id) {
      return next(creatError(400, `you can't follow yourself `));
    }

    const follow = await Follow.findOne({
      where: { [Op.and]: [{ followers: user.id, following: userId }] },
    });

    if (follow) {
      await follow.destroy();
      return res.status(200).json({
        message: 'successfully unfollow user',
        code: 200,
        follow,
      });
    } else {
      await Follow.create({
        followers: user.id,
        following: userId,
      });
      return res.status(200).json({
        message: 'successfully follow user',
        code: 200,
        follow,
      });
    }
  } catch (error) {
    next(error);
  }
};
