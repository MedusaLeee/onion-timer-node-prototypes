/**
 * 可以访问http2
 * https://github.com/hisco/http2-client
 */
const { get } = require('http2-client');
const getBody = stream => {
    return new Promise((resolve , reject)=>{
        let bodyRaw = '';
        stream.on('data' , (chunk)=>{
            bodyRaw+=chunk;
        });
        stream.on('end',(chunk)=>{
            if (chunk)
                bodyRaw+=chunk;
            resolve(bodyRaw);
        });
        stream.on('error' , (err)=>{
            reject(err)
        })
    })
}

get('https://localhost:3000', (res)=>{
    console.log(`Status : ${res.statusCode}, HttpVersion : ${res.httpVersion}`);
    getBody(res).then(body => {
        console.log(body)
    })
});

get({
    protocol : 'https:',
    path : '/',
    host : 'localhost',
    port : 3000,
    method : 'post',
    headers : {}
} , (res)=>{
    getBody(res)
        .then((bodyRaw)=>{
            const json = JSON.parse(bodyRaw);
            console.log('post body: ', json)
        })
        .catch((err)=>{
            console.log(err)
        })
});
