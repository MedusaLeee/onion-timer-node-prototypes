const getRawBody = require('raw-body')

const protobufParser = async (ctx, next) => {
    const p = /^application\/protobuf;/
    const contentType = ctx.get('content-type')
    if (!contentType) {
        return await next()
    }
    if (p.test(contentType.toLowerCase())) {
        await getRawBody(ctx.req)
        return await next()
    }
    await next()
}

// await new Promise((resolve,reject)=>{
//     let buffers = [];
//     ctx.req.on('data',function(data){
//         buffers.push(data);
//     });
//     ctx.req.on('end',function(){
//         ctx.request.body = Buffer.concat(buffers)
//         resolve();
//     });
// });

module.exports = protobufParser