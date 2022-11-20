import { SessionManager } from "./lib/sessionManager";
import { SocketClient } from "./lib/socket/client/socketClient";
import { Socket } from "net";
import {TcpChannel} from "./lib/socket/client/tcpChannel";


const sessionManager = new SessionManager();

const sessionId = sessionManager.add(SocketClient, new TcpChannel(new Socket()))
sessionManager.connect(sessionId).then(()=>{
   setInterval(()=>{
     sessionManager.send(sessionId, Buffer.from("hello"))

   },3000)
})


