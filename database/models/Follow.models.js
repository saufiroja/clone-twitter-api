const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./sequelize');

class Follow extends Model {}

Follow.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  {
    sequelize,
    tableName: 'Follow',
    timestamps: true,
  }
);

module.exports = { Follow };
