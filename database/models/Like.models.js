const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('./sequelize');

class Like extends Model {}

Like.init(
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
    tableName: 'Like',
    timestamps: true,
  }
);

module.exports = { Like };
