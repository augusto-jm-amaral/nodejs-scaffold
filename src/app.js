require('./config/loadEnv')
const Express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const routes = require('./routes')
const { formatError } = require('./utils')

const app = Express()

/** middlewares */
app.use(logger('dev'))
app.disable('x-powered-by')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => { //eslint-disable-line

  console.error(err.stack || err)
  const formattedError = formatError(err)

  res.status(formattedError.status || 500)
  res.json(formattedError)
})


module.exports = app
