const database = require('../../database')
const { generateText, documents } = require('../../utils')

const {
  user: User,
  role: Role,
} = database.models

const createTemporaryUser = async (req, res, next) => {
  const transaction = await database.transaction()
  try {
    const rawPassword = generateText(30)
    const primaryUser = {
      name: 'user',
      email: `${generateText(20)}@gmail.com`,
      password: rawPassword,
      documentType: 'cpf',
      document: documents.generateCPF(),
    }

    const adminRole = await Role.findOne({
      where: {
        type: 'admin',
      },
      transaction,
      raw: true,
    })

    const userIntance = User.build(primaryUser)

    userIntance.addRole(adminRole.id, { transaction })

    await userIntance.save({ transaction })

    await transaction.commit()
    const rawUser = userIntance.get({ plain: true })
    rawUser.password = rawPassword

    res.status(200).json(rawUser)
  } catch (error) {
    transaction.rollback()
    next(error)
  }
}

module.exports = createTemporaryUser
