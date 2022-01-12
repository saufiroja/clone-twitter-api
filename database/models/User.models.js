const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('./sequelize');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    gender: {
      type: DataTypes.ENUM(['Female', 'Male']),
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'User',
    timestamps: true,
  }
);

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 12);
});

module.exports = { User };
