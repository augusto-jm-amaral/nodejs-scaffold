import test from 'ava'
import getConfig from '../../../src/config/getConfig'

const configMock = {
  development: {
    database: 'postgres-development',
  },
  test: {
    database: 'postgres-test',
  },
  production: {
    database: 'postgres-production',
  },
}

test('call with argument', (t) => {
  const config = getConfig(configMock)('production')

  t.deepEqual(config, {
    database: 'postgres-production',
  }, 'should get the production config')
})

test.afterEach(() => {
  process.env.NODE_ENV = 'test'
})

test.serial('process.env.NODE_ENV set to development', (t) => {
  process.env.NODE_ENV = 'developent'
  const config = getConfig(configMock)('development')
  t.deepEqual(config, {
    database: 'postgres-development',
  }, 'should get development config')
})

test.serial('process.env.NODE_ENV set to empty', (t) => {
  process.env.NODE_ENV = ''
  const config = getConfig(configMock)()

  t.deepEqual(config, {
    database: 'postgres-test',
  }, 'should get test config')
})
