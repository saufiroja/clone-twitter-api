const { User } = require('./User.models');
const { RefreshToken } = require('./RefreshToken.models');
const { Tweet } = require('./Tweet.models');

User.hasMany(RefreshToken, { foreignKey: 'userId' });
User.hasMany(Tweet, { foreignKey: 'userId' });

RefreshToken.belongsTo(User, { foreignKey: 'userId' });
Tweet.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, RefreshToken, Tweet };
