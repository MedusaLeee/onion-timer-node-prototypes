/**
 * protobuf 与 json序列化 大小对比
 */
const protobuf = require('protobufjs');
const root = protobuf.loadSync('./msg.proto');
const Job = root.lookupType('timer.Job');

const payload = {
    a:'aaaaaa',
    b:'bbbbbb'
};
// 使用protobuf 序列化
const jobObj = Job.fromObject({ appId:'abc', jobAt: 1554301998, payload: JSON.stringify(payload) });

const buffer = Job.encode(jobObj).finish();

console.log(buffer.length); // 40

// 反序列化
const decodeJob = Job.decode(buffer).toJSON();

console.log(decodeJob);

// 使用纯json 序列化 对比长度

const jsonStr = JSON.stringify({ appId:'abc', jobAt: 1554301998, payload: JSON.stringify(payload) });

const jsonBuffer = Buffer.from(jsonStr);

console.log(jsonBuffer.length); // 82

// 40 比 82 json 序列化后比 protobuf 序列化后 大一倍 多