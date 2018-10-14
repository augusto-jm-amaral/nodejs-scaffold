module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .createTable('session', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('browser', 'app'),
        defaultValue: 'browser',
        allowNull: false,
      },
      lastActivity: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'user',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    }),
  down: (queryInterface) => {
    queryInterface.dropTable('session')
  },
}
