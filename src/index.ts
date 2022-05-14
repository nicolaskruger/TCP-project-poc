// happy coding 👻

import { createServer, Socket } from "net"
type Message = {
    name: string,
    msg: string
}


const numberOfClients = 3

const sockets:{ list:Socket[]} = { list:[] }

const server = createServer((socket) => {
    socket.on("data", (data) =>{
        const msg = data.toString()
        const message: Message = JSON.parse(data.toString())
        sockets.list.filter(_socket => {
            return socket !== _socket
        } )
        .forEach((_socket, index, arr) => {
            _socket.write(data)
            _socket.resume()
        })
    })

    const close = () => {
        sockets.list = sockets.list.filter(_soket => socket !== _soket)
        socket.destroy()
    }

    ["close", "end", "error"].forEach(
        oper => {
            socket.on(oper, close)
        }
    )

    socket.pipe(socket)
    sockets.list = [...sockets.list, socket]
})

server.listen(1337, `127.0.0.1`)

" ".repeat(numberOfClients).split(``)
    .map(_ => {
        return new Socket()
    })
    .map((client, index) => client.connect(1337, `127.0.0.1`, function () {
        
        const msg: Message = {
            name: `user: ${index}`,
            msg: `hello every one`
        }
        
        client.on(`data`, function (data) {

            const _data = data.toString()

            const msg = data.toString().split("}{")
                .map((v, index, arr) => index === 0 ? `${v}}` : index == (arr.length - 1) ? `{${v}` : `{${v}}`  )
                .map(v => {
                    return JSON.parse(v) as Message
                })
            // const message:Message = JSON.parse(data.toString())  
            // console.log(`Received: ${index}` + data);
            client.destroy(); // kill client after server`s response
        })
        client.write(JSON.stringify(
                msg
            ))
        }))
    .forEach((client, index) => client.on(`close`, function () {
        // console.log(`Connection closed ${index}`);
    }))

