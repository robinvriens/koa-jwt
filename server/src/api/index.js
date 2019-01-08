const Router = require('koa-router')

const router = new Router()

router.get('/public/register', ctx => {
  ctx.body = 'register'
})

router.get('/public/login', ctx => {
  ctx.body = 'login'
})

router.get('/api/user/me', ctx => {
  ctx.body = 'user'
})

module.exports = router
