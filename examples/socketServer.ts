import { SocketServer } from "../lib/socket/server/socketServer";
import {StringFilter} from "../lib/filter";

const appServer = new SocketServer({port:8888,host:"0.0.0.0"},StringFilter)
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
