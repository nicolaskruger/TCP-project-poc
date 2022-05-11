// happy coding 👻
import { createServer, Socket } from "net"

const server = createServer((socket) => {
    socket.write('Echo server\r\n')
    socket.pipe(socket)
})

server.listen(1337, '127.0.0.1')

const client = new Socket();

client.connect(1337, '127.0.0.1', function () {
    console.log('Connected');
    client.write('Hello, server! Love, Client.');
});

client.on('data', function (data) {
    console.log('Received: ' + data);
    client.destroy(); // kill client after server's response
});

client.on('close', function () {
    console.log('Connection closed');
});