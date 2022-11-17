import { SocketClient } from "./lib/socket/client/socketClient";

const socket = new SocketClient()
async function run(){
    await socket.connect("192.168.1.39")
    socket.receive(buffer => console.log(buffer))
}

run().then(r =>{});

setInterval(function(){
    //socket.send(Buffer.from([0xFD,0x00,0x0F,0x01,0x00,0x5B,0x6D,0x35,0x31,0x5D,0xBF,0xC6,0xB4,0xF3,0xD1,0xB6,0xB7,0xC9]))
},3000);


