module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .createTable('user_role', {
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
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'role',
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
    }),
  down: (queryInterface) => {
    queryInterface.dropTable('user_role')
  },
}
