const Router = require('koa-router')
const jwt = require('jsonwebtoken')

const router = new Router()

const user = {
  username: 'test',
  password: 'test'
}

router.post('/public/register', async (ctx, next) => {
  if (!ctx.request.body.username || !ctx.request.body.password) {
    ctx.status = 400
    ctx.body = {
      error: 'expected a valid username and password'
    }
    return
  } else {
    ctx.body = ctx.request.body
  }
})

router.post('/public/login', async (ctx, next) => {
  if (ctx.request.body.username === user.username && ctx.request.body.password === user.password) {
    ctx.body = {
      token: jwt.sign({
        data: user
      }, 'shared-secret', {
        expiresIn: '1h'
      })
    }
  } else {
    ctx.status = 400
    ctx.body = {
      error: 'invalid username or password'
    }
    return
  }
})

router.get('/api/user/me', ctx => {
  ctx.body = ctx.state.user
})

module.exports = router
