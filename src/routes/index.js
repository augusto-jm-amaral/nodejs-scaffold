const route = require('express').Router()
const unprotectedRoutes = require('./unprotected')
const protectedRoutes = require('./protected')
const { authentication } = require('../infra/middlewares')

route.use('/api', authentication)
route.use('/api', protectedRoutes)

route.use('/', unprotectedRoutes)

module.exports = route
