const route = require('express').Router()
const validate = require('express-validation')
const {
  user: userController,
  session: sessionController,
} = require('../../controllers')
const { user: userValidation } = require('../../infra/validations')

route.post(
  '/user/temporary',
  validate(userValidation.temporary),
  userController.temporary,
)

route.post('/login', sessionController.login)

module.exports = route
