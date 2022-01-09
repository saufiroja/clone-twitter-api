const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

class RefreshToken extends Model {}

RefreshToken.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiredAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'RefreshToken',
    timestamps: true,
  }
);

module.exports = { RefreshToken };
