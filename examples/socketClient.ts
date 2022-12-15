import {SessionManager} from "../lib/sessionManager";
import {SocketClient} from "../lib/socket/client/socketClient";
import {TcpChannel} from "../lib/socket/client/tcpChannel";
import {StringFilter} from "../lib/filter";

// const sessionManager = new SessionManager();

// const sessionId = sessionManager.add(SocketClient, TcpChannel, [{ address: "101.32.205.22", port: 8888},new StringFilter()])
// sessionManager.onData(sessionId, (message: any) => {
//     console.log("消息:", message)
// })
// function connect(){
//     sessionManager.connect(sessionId).then((result) => {
//         if (result)
//             setInterval(() => {
//                 sessionManager.send(sessionId, Buffer.from([0x0d,0x0a,0x11,0x11,0x22,0x33]))
//             }, 3000)
//         else
//             setTimeout(connect,3000)
//     }).catch(e=>{
//         setTimeout(connect,3000)
//     })
// }
//
// connect();
