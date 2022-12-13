import { SerialChannel } from "../lib/serialPort/client/serialChannel";
import { SerialClient } from "../lib/serialPort/client/serialClient";
import { SessionManager } from "../lib/sessionManager";
import {SerialPort} from "serialport";

const sessionManager = new SessionManager();
SerialPort.list().then(s=>{
    console.log(s)
})
const sessionId = sessionManager.add(SerialClient, SerialChannel, {
  path: '/dev/tty.usbserial-AR0K7IQ6',
  baudRate: 115200,
  autoOpen: false,
})
sessionManager.onData(sessionId, (message: any) => {
  console.log("消息:", message)
})

function connect(){
    sessionManager.connect(sessionId).then((result) => {
        if (result)
           setInterval(() => {
        sessionManager.send(sessionId, Buffer.from([
            0x01, 0x10, 0x00, 0x01, 0x00, 0x04, 0x08, 0xD5, 0xC5, 0x20, 0x20, 0xC8, 0xFD, 0x20, 0x20, 0x22, 0xF9
        ]))
    }, 3000);
        else
            setTimeout(connect,3000)
    }).catch(e=>{
        setTimeout(connect,3000)
    })
}

connect();

