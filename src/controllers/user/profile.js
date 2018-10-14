const R = require('ramda')

const getUserFromReq = R.pathOr(null, ['context', 'user'])

const profile = (req, res, next) => {
  try {
    res.json(getUserFromReq(req))
  } catch (error) {
    next(error)
  }
}

module.exports = profile
