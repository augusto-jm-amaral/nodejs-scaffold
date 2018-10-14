import test from 'ava'
import sinon from 'sinon'
import { authorization } from '../../../../src/infra/middlewares'
import { AuthenticationError } from '../../../../src/infra/errors'

test('should call next function when user has the right permissions', (t) => {
  const userMock = {
    roles: [
      {
        id: 1,
        name: 'Admin',
        type: 'admin',
        createdAt: '2018-09-12T00:33:53.948Z',
        updatedAt: '2018-09-12T00:33:53.948Z',
        deletedAt: null,
        user_role: {
          createdAt: '2018-09-13T19:28:14.843Z',
          updatedAt: '2018-09-13T19:28:14.843Z',
          userId: '28c8de30-b78b-11e8-881c-13c90b5510e3',
          roleId: 1,
        },
      },
    ],
  }
  const reqMock = {
    context: {
      user: userMock,
    },
  }

  const next = sinon.spy()

  const middleware = authorization('admin')
  middleware(reqMock, null, next)

  t.true(next.calledOnceWithExactly())
})

test('should call next function when resource allows all *(all)', (t) => {
  const userMock = {
    roles: [
      {
        id: 1,
        name: 'Admin',
        type: 'admin',
        createdAt: '2018-09-12T00:33:53.948Z',
        updatedAt: '2018-09-12T00:33:53.948Z',
        deletedAt: null,
        user_role: {
          createdAt: '2018-09-13T19:28:14.843Z',
          updatedAt: '2018-09-13T19:28:14.843Z',
          userId: '28c8de30-b78b-11e8-881c-13c90b5510e3',
          roleId: 1,
        },
      },
    ],
  }
  const reqMock = {
    context: {
      user: userMock,
    },
  }

  const next = sinon.spy()

  const middleware = authorization('*')
  middleware(reqMock, null, next)

  t.true(next.calledOnceWithExactly())
})

test('should not next function when user does not have the right permission to access resource', (t) => {
  const userMock = {
    roles: [
      {
        id: 1,
        name: 'Employee',
        type: 'employee',
        createdAt: '2018-09-12T00:33:53.948Z',
        updatedAt: '2018-09-12T00:33:53.948Z',
        deletedAt: null,
        user_role: {
          createdAt: '2018-09-13T19:28:14.843Z',
          updatedAt: '2018-09-13T19:28:14.843Z',
          userId: '28c8de30-b78b-11e8-881c-13c90b5510e3',
          roleId: 1,
        },
      },
    ],
  }
  const reqMock = {
    context: {
      user: userMock,
    },
  }

  const next = sinon.spy()

  const middleware = authorization('admin', 'finance')
  middleware(reqMock, null, next)

  t.true(next.calledWithMatch(sinon.match.instanceOf(AuthenticationError)))
})
