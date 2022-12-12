#GetStarted
Install
```shell
npm install @sevenqi/node-channel
```
##Client example SocketClient

```typescript
import {SessionManager} from "./sessionManager";
import {Buffer} from "buffer";

const sessionManager = new SessionManager();

const sessionId = sessionManager.add(SocketClient, 
                                     TcpChannel, 
                                     {address: "101.32.205.22", port: 8888})

sessionManager.onData(sessionId, (message: any) => {
    console.log("消息:", message)
})

const isConnected = await sessionManager.connect(sessionId);
if (isConnected)
    SessionManager.send(sessionId, Buffer.from("hello world"))

```
