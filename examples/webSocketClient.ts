import {SessionManager} from "../lib/sessionManager";
import {WebSocketClient} from "../lib/webSocket/client/webSocketClient";
import {WebSocketChannel} from "../lib/webSocket/client/webSocketChannel";
import {StringFilter} from "../lib/filter";

const sessionManager = new SessionManager();

const sessionId = sessionManager.add(WebSocketClient, WebSocketChannel,[{address:"ws://192.168.1.79:8888"},new StringFilter()])
sessionManager.onData(sessionId, (message: any) => {
    console.log("消息:", message)
})
sessionManager.connect(sessionId).then(() => {
    setInterval(() => {
        sessionManager.send(sessionId, "hello")
    }, 3000)
})
sessionManager.onData(sessionId, (message: any) => {
    console.log("消息测试:", message)
})
