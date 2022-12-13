import {SessionManager} from "../lib/sessionManager";
import {UdpChannel} from "../lib/udp/Server/udpChannel";
import {UdpServer} from "../lib/udp/server/udpServer";

const sessionManager = new SessionManager();

const sessionId = sessionManager.add(UdpServer, UdpChannel,{port:10001,host:"127.0.0.1"})
sessionManager.onData(sessionId, (message: any) => {
    console.log("消息:", message)
})
sessionManager.connect(sessionId)
// setInterval(() => {
//     sessionManager.send(sessionId, Buffer.from([0x0d,0x0a,0x11,0x11,0x22,0x33]))
// }, 3000)
