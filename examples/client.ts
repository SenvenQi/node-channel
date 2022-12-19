import { SessionManager } from "../lib/sessionManager";
import { StringFilter } from "../lib/filter";
import { ChannelType } from "../lib/config";

const sessionManager = new SessionManager();

const webSocketSessionId = sessionManager.add({
    channelType: ChannelType.WebSocket,
    channelOptions: {
        options: { address: "ws://0.0.0.0:8888" },
        filter: StringFilter
    }
})

const tcpSessionId = sessionManager.add({
    channelType: ChannelType.Tcp,
    channelOptions: {
        options: { port: 8889, host: "0.0.0.0" },
        filter: StringFilter
    }
})

const udpSessionId = sessionManager.add({
    channelType: ChannelType.Udp,
    channelOptions: {
        options: { port: 8890, host: "0.0.0.0" },
        filter: StringFilter
    }
})

// const serialSessionId = sessionManager.add({
//     channelType:ChannelType.Serial,
//     channelOptions:{
//     options:{
//         path: '/dev/tty.usbserial-AR0K7IQ6',
//         baudRate: 115200,
//         autoOpen: false,
//     },
//     filter:StringFilter}})
//
// const hidSessionId = sessionManager.add({
//     channelType:ChannelType.Hid,
//     channelOptions:{
//     options : '/IO/Hid',
//     filter:StringFilter}})

sessionManager.onDataAll((message: any) => {
    console.log("消息:", message)
})

// sessionManager.connect(hidSessionId).then(() => {
//     setInterval(() => {
//         sessionManager.send(hidSessionId, "hello hid")
//     }, 3000)
// })
sessionManager.connect(udpSessionId).then(() => {
    setInterval(() => {
        sessionManager.send(udpSessionId, "hello udpSocket")
    }, 3000)
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
// sessionManager.connect(serialSessionId).then(() => {
//     setInterval(() => {
//         sessionManager.send(serialSessionId, "hello serialPort")
//     }, 3000)
// })
