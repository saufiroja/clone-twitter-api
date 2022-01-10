'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tweet', {
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
      image: {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: true,
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

    await queryInterface.addColumn('Tweet', 'userId', {
      type: Sequelize.UUID,
      references: {
        model: 'User',
        key: 'id',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Tweet');
  },
};
