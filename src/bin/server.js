const app = require('../app')
const database = require('../database')
const { getLogger } = require('../utils')

const logger = getLogger('scaffold:server')
const port = process.env.NODE_PORT || 3000
const ensureDBIsConnected = () => database.authenticate()

const startServer = () => {
  const server = app.listen(port, () => {
    logger.info(`Listening on ${port}`)
  })

  server.on('error', (error) => {
    if (error.syscall !== 'listen') {
      throw error
    }

    switch (error.code) {
      case 'EACCES':
        logger.error(`${port} requires elevated privileges`)
        process.exit(1)
        break
      case 'EADDRINUSE':
        logger.error(`${port} is already in use`)
        process.exit(1)
        break
      default:
        throw error
    }
  })
}

module.exports = ensureDBIsConnected()
  .then(() => logger.info('databse is connected'))
  .then(() => logger.info('starting server'))
  // .then(() => database.sync({ force: true }))
  .then(startServer)
  .catch(error => logger.error('An error occurred', error))
