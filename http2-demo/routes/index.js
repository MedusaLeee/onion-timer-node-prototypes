const router = require('koa-router')()

router.get('/', async ctx => {
  ctx.body =  {
    title: 'Hello Koa 2!'
  }
})

router.post('/', async ctx => {
  const body = ctx.request.body
  console.log(body)
  ctx.body =  body
})

module.exports = router
