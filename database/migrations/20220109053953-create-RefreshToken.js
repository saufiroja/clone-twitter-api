'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RefreshToken', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaulValue: Sequelize.UUIDV4,
      },
      refreshToken: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expiredAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addColumn('RefreshToken', 'userId', {
      type: Sequelize.UUID,
      references: {
        model: 'User',
        key: 'id',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('RefreshToken');
  },
};
