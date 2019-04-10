const fs = require('fs')
const getRawBody = require('raw-body')
const protobuf = require('protobufjs')


const protobufParser = (protoPath) => {
    if (!fs.existsSync(protoPath)) {
        throw new Error(`protoPath: ${protoPath}, 对应的文件不存在`)
    }
    const root = protobuf.loadSync(protoPath)
    return async (ctx, next) => {
        const p = /^application\/x-protobuf;proto=/
        const contentType = ctx.get('content-type')
        if (!contentType) {
            return await next()
        }
        if (p.test(contentType.toLowerCase().trim())) {
            const namespace = contentType.substr(contentType.search(/proto=/gi) + 6)
            const Message = root.lookupType(namespace)
            const buf = await getRawBody(ctx.req)
            const decodeObj = Message.decode(buf).toJSON()
            ctx.request.body = decodeObj
            return await next()
        }
        await next()
    }
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
