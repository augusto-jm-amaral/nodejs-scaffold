const cnpj = require('@fnando/cnpj/dist/node')
const cpf = require('@fnando/cpf/dist/node')

module.exports = {
  generateCNPJ: cnpj.generate,
  generateCPF: cpf.generate,
  validateCNPJ: cnpj.isValid,
  validateCPF: cpf.isValid,
}
