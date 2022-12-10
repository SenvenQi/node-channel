import {SessionManager} from "../lib/sessionManager";
import {UdpClient} from "../lib/udp/client/udpClient";
import {UdpChannel} from "../lib/udp/client/udpChannel";

const sessionManager = new SessionManager();

const sessionId = sessionManager.add(UdpClient, UdpChannel,{port:9999,host:"192.168.1.79"})
sessionManager.onData(sessionId, (message: any) => {
    console.log("消息:", message)
})
sessionManager.connect(sessionId).then(() => {
    setInterval(() => {
        sessionManager.send(sessionId, Buffer.from([0x5A,0x00,0x01,0x02,0xFF,0x00,0x00,0x88,0x5A]))
    }, 3000)
})
sessionManager.onData(sessionId, (message: any) => {
    console.log("消息测试:", message)
})
