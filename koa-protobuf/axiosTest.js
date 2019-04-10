
const axios = require('axios')
const protobuf = require('protobufjs');
const root = protobuf.loadSync('./proto/msg.proto');
const Job = root.lookupType('timer.Job');


const decodeProtobuf = (protoPath, resp) => {
    const selfRoot = protobuf.loadSync(protoPath);
    const p = /^application\/x-protobuf;proto=/
    const contentType = resp.headers['content-type']
    if (!contentType || !p.test(contentType.toLowerCase().trim())) {
        throw new Error('错误的contentType: ' + contentType)
    }
    const namespace = contentType.substr(contentType.search(/proto=/gi) + 6)
    const Message = selfRoot.lookupType(namespace)
    const decodeObj = Message.decode(resp.data).toJSON()
    return decodeObj
}

const payload = {
    a:'aaaaaa',
    b:'bbbbbb'
};
// 使用protobuf 序列化
const jobObj = Job.fromObject({ appId:'abc', jobAt: 1554301998, payload: JSON.stringify(payload) });

const data = Job.encode(jobObj).finish();

axios.post('http://localhost:3000/proto', data, {
    responseType: 'arraybuffer',
    headers: {
        'content-type': 'application/x-protobuf;proto=timer.Job'
    }
}).then(resp => {
    console.log('headers: ', resp.headers)
    console.log('data: ', decodeProtobuf('./proto/msg.proto', resp))
}).catch(e => {
    console.log('e: ', e)
})
