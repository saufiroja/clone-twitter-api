const { User } = require('./User.models');
const { RefreshToken } = require('./RefreshToken.models');

User.hasMany(RefreshToken, { foreignKey: 'userId' });

RefreshToken.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, RefreshToken };
