const router = require('koa-router')()

router.get('/', async ctx => {
  ctx.body =  {
    title: 'Hello Koa 2!'
  }
})

module.exports = router
