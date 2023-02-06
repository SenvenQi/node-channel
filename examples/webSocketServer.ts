import {WebSocketServer} from "../lib/webSocket/server/webSocketServer";
import {StringFilter} from "../lib/filter";

const appServer = new WebSocketServer({port:8888},StringFilter)
appServer.onServerData((message)=>{
    console.log((JSON.parse(message).msg))
})

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
