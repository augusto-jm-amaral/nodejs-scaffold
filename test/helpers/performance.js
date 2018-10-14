// const Promise = require('bluebird')
// const getRequest = require('./getRequest')

// const request = getRequest({
//   baseURL: 'http://localhost:3000',
//   timeout: 60000,
// })
// const createTest = (times = 10) => {
//   const promises = [times]
//   for (let i = 0; i < times; i += 1) {
//     promises.push(request.post('/temporary'))
//   }
//   return promises
// }

// Promise
//   .resolve()
//   .then(() => console.time('runtime'))
//   .then(() => Promise.all(createTest(2)))
//   .then(() => console.timeEnd('runtime'))
//   .catch(error => console.log(error))
