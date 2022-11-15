import { SocketClient } from "./lib/socket/client/socketClient";

async function run(){
    const socket = new SocketClient()
    await socket.connect("192.168.1.222")
    socket.send(Buffer.from([0xFD,0x00,0x0F,0x01,0x00,0x5B,0x6D,0x35,0x31,0x5D,0xBF,0xC6,0xB4,0xF3,0xD1,0xB6,0xB7,0xC9]))
    socket.receive = buffer=>console.log(buffer)
}

run().then(r =>{});
const readline = require('readline');

function readSyncByRl(tips) {
    tips = tips || '> ';

    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(tips, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

readSyncByRl('请输入任意字符：').then((res) => {
    console.log(res);
});




