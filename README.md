# onion-timer-node-prototypes
node prototypes for onion timer v3

## JSON对象序列化

### protobuf vs JSON.stringify

40 比 82 json 序列化后比 protobuf 序列化后 大一倍 多

[protobuf.js](./serialization/protobuf.js)

## HTTP2

各种库对http2支持还不是特别好，本次还是采用protobuf on http1.1

[koa http2](./http2-demo)

## protobuf on HTTP

[koa demo](./koa-protobuf/README.md)

## RocksDB

TODO

## TCP封包解包

### protobuf on TCP

TODO

### TCP Proxy

TODO

## UDP内网相互发现

TODO
