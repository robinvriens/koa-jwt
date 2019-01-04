const Koa = require('koa')
const logger = require('koa-logger')
const jwt = require('koa-jwt')

const app = new Koa()

// Custom 401 handling
app.use((ctx, next) => {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401
      ctx.body = 'Protected resource, use Authorization header to get acces\n'
    } else {
      throw err
    }
  })
})

// Unprotected middleware
app.use((ctx, next) => {
  if (ctx.url.match(/^\/public/)) {
    ctx.body = 'unprotected\n'
  } else {
    return next()
  }
})

app.use(logger())
app.use(jwt({ secret: 'shared-secret' }))

// Protected middleware
app.use((ctx) => {
  if (ctx.url.match(/^\/api/)) {
    ctx.body = 'protected\n'
  }
})

app.listen(8000)
