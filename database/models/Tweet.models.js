const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

class Tweet extends Model {}

Tweet.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'Tweet',
    timestamps: true,
  }
);

module.exports = { Tweet };
