import getRequest from './getRequest'

const request = getRequest()

const getTemporaryUser = () => request
  .post('/user/temporary')
  .then(response => response.body)

export default getTemporaryUser
