const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    document: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    documentType: {
      type: Sequelize.ENUM('cpf', 'rg'),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
      set(password) {
        const hash = bcrypt.hashSync(password, 10)
        this.setDataValue('password', hash)
      },
    },
  })

  User.prototype.comparePassword = function comparePassword(password) {
    return bcrypt.compareSync(password, this.password)
  }

  User.associate = (models) => {
    models.user.belongsToMany(models.role, {
      through: 'user_role',
    })
  }

  return User
}
