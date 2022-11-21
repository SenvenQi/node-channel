import { SessionManager } from "./lib/sessionManager";
import { SocketClient } from "./lib/socket/client/socketClient";
import { Socket } from "net";
import {TcpChannel} from "./lib/socket/client/tcpChannel";


const sessionManager = new SessionManager();

const sessionId = sessionManager.add(SocketClient,TcpChannel,{address:"192.168.1.34",port:10001})
sessionManager.onData(sessionId,(message:any)=>{
       console.log("消息:",message)
})
sessionManager.connect(sessionId).then(()=>{
   setInterval(()=>{
     sessionManager.send(sessionId, Buffer.from("hello"))
   },3000)
})
