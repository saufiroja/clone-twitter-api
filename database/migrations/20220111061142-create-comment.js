'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comment', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaulValue: Sequelize.UUIDV4,
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      tweetId: {
        type: Sequelize.UUID,
        references: {
          model: 'Tweet',
          key: 'id',
        },
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comment');
  },
};
