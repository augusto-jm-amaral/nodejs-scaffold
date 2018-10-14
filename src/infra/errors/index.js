class Base extends Error {
  constructor(message, statusCode = 500, errors = []) {
    super(message)
    this.statusCode = statusCode
    this.errors = errors
    // https://nodejs.org/api/errors.html#errors_error_capturestacktrace_targetobject_constructoropt
    Error.captureStackTrace(this, this.constructor)
  }
}

class UnauthorizedError extends Base {
  constructor() {
    super('UnauthorizedError', 401)
    Error.captureStackTrace(this, this.constructor)
  }
}

class AuthenticationError extends Base {
  constructor() {
    const errors = [{
      field: 'roles',
      message: 'You do not have permisson to access this resource. You may call your administrator',
      type: 'authentication',
    }]
    super('AuthenticationError', 403, errors)
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = {
  Base,
  UnauthorizedError,
  AuthenticationError,
}
