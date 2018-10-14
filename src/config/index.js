require('./loadEnv')
const getDatabaseConfig = require('./database')
const getSessionExpirationTime = require('./session')

module.exports = {
  getDatabaseConfig,
  getSessionExpirationTime,
}
