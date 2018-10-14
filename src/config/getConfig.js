const getEnv = env => env || process.env.NODE_ENV || 'test'

const getConfig = configObj => env => configObj[getEnv(env)]

module.exports = getConfig
