/**
 * 失败 axios 不支持http2
 */
const axios = require('axios')
const https = require('https')

const instance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});
instance.get('https://localhost:3000').then(resp => {
    console.log(resp.header)
    console.log(resp.data)
}).catch(e => {
    console.log(e)
})
// 无法请求http2 的 服务
