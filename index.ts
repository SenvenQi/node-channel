import { SessionManager } from "./lib/sessionManager";
import { SocketClient } from "./lib/socket/client/socketClient";
import { TcpChannel } from "./lib/socket/client/tcpChannel";
import { SocketServer } from './lib/socket/server/socketServer'
import {SerialClient} from "./lib/serialPort/client/serialClient";
import {SerialChannel} from "./lib/serialPort/client/serialChannel";
import {HidChannel} from "./lib/hid/client/hidChannel";
import {HidClient} from "./lib/hid/client/hidClient";
import * as HID from "node-hid";
import {SerialPort} from "serialport";
const sessionManager = new SessionManager();

const sessionId = sessionManager.add(SocketClient, TcpChannel, { address: "101.32.205.22", port: 8888})
sessionManager.onData(sessionId, (message: any) => {
  console.log("消息:", message)
})
sessionManager.connect(sessionId).then(() => {
  setInterval(() => {
    sessionManager.send(sessionId, Buffer.from([0x0d,0x0a,0x11,0x11,0x22,0x33]))
  }, 3000)
})
sessionManager.onData(sessionId, (message: any) => {
  console.log("消息测试:", message)
})

// const appServer = new SocketServer({path:"0.0.0.0:8888"})
// appServer.listen();
// setInterval(()=>{
//     appServer.sessions.forEach(item=>{
//         console.log(item)
//     })
// },3000)
//
// setInterval(()=>{
//     appServer.sessions.forEach((session)=>{
//         session.send(Buffer.from("ccccccccc"))
//     })
// },2000)

// const sessionManager = new SessionManager();
// // SerialPort.list().then(s=>{
// //     console.log(s)
// // })
// const sessionId = sessionManager.add(SerialClient, SerialChannel, {},{
//   path: '/dev/tty.usbserial-AR0K7IQ6',
//   baudRate: 115200,
//   autoOpen: false,
// })
// sessionManager.onData(sessionId, (message: any) => {
//   console.log("消息:", message)
// })
// sessionManager.connect(sessionId).then(() => {
//   setInterval(() => {
//
//     sessionManager.send(sessionId, Buffer.from([
// 0x01, 0x10, 0x00, 0x01, 0x00, 0x04, 0x08, 0xD5, 0xC5, 0x20, 0x20, 0xC8, 0xFD, 0x20, 0x20, 0x22, 0xF9
// ]))
//   }, 3000)
// })
// sessionManager.onData(sessionId, (message: any) => {
//   console.log("消息测试:", message)
// })

// const sessionManager = new SessionManager();
//
// const devices = HID.devices();
// const rfid = devices.filter(x => x.vendorId == 0x03eb && x.productId == 0x2421);
//
// const sessionId = sessionManager.add(HidClient, HidChannel, {}, rfid[0].path)
// sessionManager.onData(sessionId, (message: any) => {
//   console.log("消息:", message)
// })
// sessionManager.connect(sessionId).then(() => {
//   setInterval(() => {
//     sessionManager.send(sessionId, Buffer.from([0x5A,0x00,0x01,0x02,0xFF,0x00,0x00,0x88,0x5A]))
//   }, 3000)
// })
// sessionManager.onData(sessionId, (message: any) => {
//   console.log("消息测试:", message)
// })
