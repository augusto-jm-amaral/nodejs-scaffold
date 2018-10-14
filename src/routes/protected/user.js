const route = require('express').Router()
const { user } = require('./../../controllers')

route.get('/profile', user.profile)

module.exports = route
