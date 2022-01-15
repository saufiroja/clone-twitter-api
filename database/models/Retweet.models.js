const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

class Retweet extends Model {}

Retweet.init(
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
    tableName: 'Retweet',
    timestamps: true,
  }
);

module.exports = { Retweet };
