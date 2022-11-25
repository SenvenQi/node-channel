import { SessionManager } from "./lib/sessionManager";
import { SocketClient } from "./lib/socket/client/socketClient";
import { TcpChannel } from "./lib/socket/client/tcpChannel";
import { SocketServer } from './lib/socket/server/socketServer'
// const sessionManager = new SessionManager();
//
// const sessionId = sessionManager.add(SocketClient, TcpChannel, { address: "101.32.205.22", port: 8888})
// sessionManager.onData(sessionId, (message: any) => {
//   console.log("消息:", message)
// })
// sessionManager.connect(sessionId).then(() => {
//   setInterval(() => {
//     sessionManager.send(sessionId, Buffer.from([0x0d,0x0a,0x11,0x11,0x22,0x33]))
//   }, 3000)
// })
// sessionManager.onData(sessionId, (message: any) => {
//   console.log("消息测试:", message)
// })

const appServer = new SocketServer({path:"0.0.0.0:8888"})
appServer.listen();
