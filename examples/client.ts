import { SessionManager} from "../lib/sessionManager";
import {StringFilter} from "../lib/filter";
import { ChannelType } from "../lib/config";

const sessionManager = new SessionManager();

const webSocketSessionId = sessionManager.add({
    channelType:ChannelType.WebSocket,
    channelOptions:{
        options:{address:"ws://0.0.0.0:8888"},
        filter:new StringFilter()}})

const tcpSessionId = sessionManager.add({
    channelType:ChannelType.Tcp,
    channelOptions:{
        options:{port:8889,host:"0.0.0.0"},
        filter:new StringFilter()}})
sessionManager.onData(tcpSessionId, (message: any) => {
    console.log("消息:", message)
})
sessionManager.connect(tcpSessionId).then(() => {
    setInterval(() => {
        sessionManager.send(tcpSessionId, "hello tcpSocket")
    }, 3000)
})
sessionManager.connect(webSocketSessionId).then(() => {
    setInterval(() => {
        sessionManager.send(webSocketSessionId, "hello websocket")
    }, 3000)
})
