const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const Session = sequelize.define('session', {
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
    lastActivity: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    type: {
      type: Sequelize.ENUM('browser', 'app'),
      defaultValue: 'browser',
      allowNull: false,
    },
  })

  Session.associate = (models) => {
    models.session.belongsTo(models.user)
  }

  return Session
}
