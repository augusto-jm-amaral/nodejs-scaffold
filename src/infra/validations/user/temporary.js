const Joi = require('joi')

module.exports = {
  body: {
    name: Joi.string().max(200).min(3),
    document: Joi.string().max(20),
    documentType: Joi.valid('cpf', 'rg'),
    email: Joi.string().email(),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/),
  },
  options: {
    allowUnknownBody: false,
  },
}
