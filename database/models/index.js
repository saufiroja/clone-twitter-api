const { sequelize } = require('./sequelize');
const { User } = require('./User.models');
const { RefreshToken } = require('./RefreshToken.models');
const { Tweet } = require('./Tweet.models');
const { Comment } = require('./Comment.models');
const { Like } = require('./Like.models');

User.hasMany(RefreshToken, { foreignKey: 'userId' });
User.hasMany(Tweet, { foreignKey: 'userId' });
User.hasMany(Comment, { foreignKey: 'userId' });
User.hasMany(Like, { foreignKey: 'userId' });

Tweet.hasMany(Comment, { foreignKey: 'tweetId' });
Tweet.hasMany(Like, { foreignKey: 'tweetId' });
Tweet.belongsTo(User, { foreignKey: 'userId' });

RefreshToken.belongsTo(User, { foreignKey: 'userId' });

Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.belongsTo(Tweet, { foreignKey: 'tweetId' });

// Like.belongsTo(User, { foreignKey: 'userId' });
// Like.belongsTo(Tweet, { foreignKey: 'tweetId' });

module.exports = { User, RefreshToken, Tweet, Comment, Like, sequelize };
