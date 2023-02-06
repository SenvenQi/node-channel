import { SocketServer } from "../lib/tcp/server/socketServer";
import {StringFilter} from "../lib/filter";

const appServer = new SocketServer({port:8888,host:"0.0.0.0"},StringFilter)
appServer.onServerData((message)=>{
    console.log(message)
})
appServer.listen();
setInterval(()=>{
    appServer.sessions.forEach((session)=>{
        session.send(Buffer.from("ccccccccc"))
    })
},2000)
