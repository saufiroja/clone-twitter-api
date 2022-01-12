const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./sequelize');

class Comment extends Model {}

Comment.init(
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
  },
  {
    sequelize,
    tableName: 'Comment',
    timestamps: true,
  }
);

module.exports = { Comment };
