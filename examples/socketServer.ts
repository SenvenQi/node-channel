import { SocketServer } from "../lib/socket/server/socketServer";

const appServer = new SocketServer({path:"0.0.0.0:8888"})
appServer.listen();
setInterval(()=>{
    appServer.sessions.forEach(item=>{
        console.log(item)
    })
},3000)

setInterval(()=>{
    appServer.sessions.forEach((session)=>{
        session.send(Buffer.from("ccccccccc"))
    })
},2000)
