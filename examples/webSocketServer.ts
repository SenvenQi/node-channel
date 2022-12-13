import {WebSocketServer} from "../lib/webSocket/server/webSocketServer";

const appServer = new WebSocketServer({port:8888})
appServer.listen();
// setInterval(()=>{
//     appServer.sessions.forEach(item=>{
//         console.log(item)
//     })
// },3000)

setInterval(()=>{
    appServer.sessions.forEach((session)=>{
        session.send(Buffer.from("ccccccccc"))
    })
},2000)
