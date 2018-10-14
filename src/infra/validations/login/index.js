const Joi = require('joi')

module.exports = {
  body: {
    email: Joi.string().email(),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
    type: Joi.valid('browser', 'app').required(),
  },
  options: {
    allowUnknownBody: false,
  },
}
