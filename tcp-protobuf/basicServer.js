/**
 * package 结构
 * |------------------|---------------|
 * |      4 bytes     |    N bytes    |
 * |------------------|---------------|
 * |  header(length)  |     proto     |
 * |------------------|---------------|
 *
 */

const net = require('net')

const server = net.createServer(socket => {
    socket.on('data', data => {
        socket.write("hello")
    })
    socket.on('end', data => {
        console.log('disconnect')
    })
    socket.write("hello world.\n")
})

server.listen(8000, function () {
    console.log('listen 8000')
})
