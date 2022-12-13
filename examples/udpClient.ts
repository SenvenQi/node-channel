import {SessionManager} from "../lib/sessionManager";
import {UdpClient} from "../lib/udp/client/udpClient";
import {UdpChannel} from "../lib/udp/client/udpChannel";

const sessionManager = new SessionManager();

const sessionId = sessionManager.add(UdpClient, UdpChannel,{port:10001,host:"127.0.0.1"})
sessionManager.onData(sessionId, (message: any) => {
    console.log("消息:", message)
})
sessionManager.connect(sessionId)
setInterval(() => {
    sessionManager.send(sessionId, Buffer.from([0x0d,0x0a,0x11,0x11,0x22,0x33]))
}, 3000)

