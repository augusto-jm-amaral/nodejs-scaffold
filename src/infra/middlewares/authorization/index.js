const R = require('ramda')
const { AuthenticationError } = require('../../errors')

const getUserRolesFromReq = R.pipe(
  R.pathOr([], ['context', 'user', 'roles']),
  R.map(R.prop('type')),
)

const isUserAllowedToAccessResource = resourceRoles => R.pipe(
  R.intersection(resourceRoles),
  rolesIntersection => rolesIntersection.length > 0,
)

const isAllUsersAllowed = R.contains('*')

const authorization = (...allowedRoles) => (req, res, next) => {
  const userRoles = getUserRolesFromReq(req)

  if (isAllUsersAllowed(allowedRoles) || isUserAllowedToAccessResource(allowedRoles)(userRoles)) {
    return next()
  }

  return next(new AuthenticationError())
}

module.exports = authorization
