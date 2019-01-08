const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const jwt = require('koa-jwt')
const api = require('./api')

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

app.use(logger())
app.use(bodyParser())
app.use(jwt({ secret: 'shared-secret' }).unless({ path: [/^\/public/] }))
app.use(api.routes())
app.use(api.allowedMethods())

// Unprotected middleware
app.use((ctx, next) => {
  if (ctx.url.match(/^\/public/)) {
    ctx.body = 'unprotected\n'
  } else {
    return next()
  }
})

// Protected middleware
// app.use((ctx) => {
//   if (ctx.url.match(/^\/api/)) {
//     ctx.body = 'protected\n'
//   }
// })

app.listen(8000)
