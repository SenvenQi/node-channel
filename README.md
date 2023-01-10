# Supported Protocols

  |Protocol Name| Supported |
  |  ----       | :----: | 
  |  TcpSocket  | ☑    |
  |  UdpSocket  | ☑    |
  |  Hid        | ☑    |
  |  SerialPort | ☑    |

---
# Used libs
[node-serialport](https://github.com/serialport/node-serialport)
[node-hid](https://github.com/node-hid/node-hid)
[uuid](https://github.com/uuidjs/uuid)
[ws](https://github.com/websockets/ws)

---
# GetStarted
## Install
```shell
npm install @sevenqi/nodechannel
```

---
## Client Example 

### WebSocket 

```typescript
const sessionManager = new SessionManager();

const sessionId = sessionManager.add({
    channelType: ChannelType.WebSocket,
    channelOptions: {
        options: { address: "ws://0.0.0.0:8888" },
        filter: StringFilter
    }
})

sessionManager.onData(sessionId, (message: any) => {
    console.log("消息:", message)
})

const isConnected = await sessionManager.connect(sessionId);
if (isConnected)
    SessionManager.send(sessionId, Buffer.from("hello world"))
```
