import test from 'ava'
import R from 'ramda'
import {
  database,
  getTemporaryUser,
  getRequest,
} from '../../helpers'

const {
  user: User,
} = database.models

const request = getRequest()

test.beforeEach(async (t) => {
  const user = await getTemporaryUser()

  t.context.user = user
})

test('should return a valid session', async (t) => {
  const {
    user: contextUser,
  } = t.context
  const pickFromUser = R.pick(['id', 'name', 'document', 'email'])

  const sessionType = 'browser'
  const {
    statusCode,
    body,
  } = await request.post('/login', {
    username: contextUser.email,
    password: contextUser.password,
    type: sessionType,
  })

  t.is(statusCode, 200)
  t.truthy(body)

  t.is(body.userId, contextUser.id)
  t.is(body.type, sessionType)

  t.truthy(body.user)
  t.deepEqual(pickFromUser(body.user), pickFromUser(contextUser))
})


test('should failed with UnauthorizedError when user or password is incorrect', async (t) => {
  const {
    statusCode,
    body,
  } = await request.post('/login', {
    username: 'incorrectUser',
    password: 'incorrectPassword',
  })

  t.is(statusCode, 401)
  t.truthy(body)

  t.is(body.status, 401)
  t.is(body.name, 'UnauthorizedError')
})

test('should failed with UnauthorizedError if user is deleted', async (t) => {
  const {
    user: contextUser,
  } = t.context

  await User.update(
    { deletedAt: new Date() },
    {
      where: {
        id: contextUser.id,
      },
    },
  )

  const sessionType = 'browser'
  const {
    statusCode,
    body,
  } = await request.post('/login', {
    username: contextUser.email,
    password: contextUser.password,
    type: sessionType,
  })

  t.is(statusCode, 401)
  t.truthy(body)

  t.is(body.status, 401)
  t.is(body.name, 'UnauthorizedError')
})
