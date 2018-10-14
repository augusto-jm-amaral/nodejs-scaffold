import test from 'ava'
import config from '../../../src/config'

test('to be a object', (t) => {
  t.is(typeof config === 'object', true)
})

test('to have getDatabaseConfig function', (t) => {
  t.is('getDatabaseConfig' in config, true)
  t.is(typeof config.getDatabaseConfig === 'function', true)
})
