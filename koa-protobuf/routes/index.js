const router = require('koa-router')()
const protobufParser = require('../middleware/protobufParser')

const protobuf = require('protobufjs');
const root = protobuf.loadSync('./proto/msg.proto');
const Job = root.lookupType('timer.Job');

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

router.post('/proto', protobufParser('./proto/msg.proto'), async ctx => {
  const body = ctx.request.body
  console.log('proto: ', body)
  ctx.set('content-type', 'application/x-protobuf;proto=timer.Job')
  // 使用protobuf 序列化
  const jobObj = Job.fromObject(body);
  const buffer = Job.encode(jobObj).finish();
  ctx.body =  buffer
})

module.exports = router
