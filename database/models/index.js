const { sequelize } = require('./sequelize');
const { User } = require('./User.models');
const { RefreshToken } = require('./RefreshToken.models');
const { Tweet } = require('./Tweet.models');
const { Comment } = require('./Comment.models');

User.hasMany(RefreshToken, { foreignKey: 'userId' });
User.hasMany(Tweet, { foreignKey: 'userId' });
User.hasMany(Comment, { foreignKey: 'userId' });

Tweet.hasMany(Comment, { foreignKey: 'tweetId' });

RefreshToken.belongsTo(User, { foreignKey: 'userId' });
Tweet.belongsTo(User, { foreignKey: 'userId' });

Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.belongsTo(Tweet, { foreignKey: 'tweetId' });

module.exports = { User, RefreshToken, Tweet, Comment, sequelize };
