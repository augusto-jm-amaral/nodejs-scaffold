import getRequest from './getRequest'

const request = getRequest()

const createSession = (username, password, type = 'browser') => request
  .post('/login', {
    username,
    password,
    type,
  })
  .then(response => response.body)

export default createSession
