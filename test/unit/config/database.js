import test from 'ava'
import getDatabaseConfig from '../../../src/config/database'

test('to be a function', (t) => {
  t.is(typeof getDatabaseConfig === 'function', true)
})

test('to have config for test', (t) => {
  const databseConfig = getDatabaseConfig('test')
  t.is(Boolean(databseConfig), true)
  t.is(typeof databseConfig === 'object', true)
})

test('to have config for development', (t) => {
  const databseConfig = getDatabaseConfig('development')
  t.is(Boolean(databseConfig), true)
  t.is(typeof databseConfig === 'object', true)
})

test('to have config for production', (t) => {
  const databseConfig = getDatabaseConfig('production')
  t.is(Boolean(databseConfig), true)
  t.is(typeof databseConfig === 'object', true)
})

test('config for production must have all keys', (t) => {
  const databseConfig = getDatabaseConfig('production')
  t.is('host' in databseConfig, true)
  t.is('port' in databseConfig, true)
  t.is('database' in databseConfig, true)
  t.is('username' in databseConfig, true)
  t.is('password' in databseConfig, true)
  t.is('logging' in databseConfig, true)
})
