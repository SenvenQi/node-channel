# node-channel

A small unified abstraction over TCP / UDP / WebSocket / HID / SerialPort
transports. Every transport is wrapped as a `channel` and managed through a
`SessionManager`, so application code talks to one consistent send/receive API
regardless of the underlying protocol.

## Supported Protocols

| Protocol Name | Supported |
| ------------- | :-------: |
| TcpSocket     |    ☑      |
| UdpSocket     |    ☑      |
| WebSocket     |    ☑      |
| Hid           |    ☑      |
| SerialPort    |    ☑      |

## Used libs

- [node-serialport](https://github.com/serialport/node-serialport)
- [node-hid](https://github.com/node-hid/node-hid)
- [uuid](https://github.com/uuidjs/uuid)
- [ws](https://github.com/websockets/ws)

---

## Install

```shell
npm install @sevenqi/nodechannel
```

---

## Client usage

The flow is always the same: `add` a session, register an `onData` handler,
`connect`, then `send`.

### WebSocket

```typescript
import { SessionManager, ChannelType, StringFilter } from "@sevenqi/nodechannel";

const sessionManager = new SessionManager();

const sessionId = sessionManager.add({
    channelType: ChannelType.WebSocket,
    channelOptions: {
        options: { address: "ws://127.0.0.1:8888" },
        filter: StringFilter,
    },
});

sessionManager.onData(sessionId, (message: any) => {
    console.log("message:", message);
});

const isConnected = await sessionManager.connect(sessionId);
if (isConnected) {
    sessionManager.send(sessionId, Buffer.from("hello world"));
}
```

### TCP

```typescript
const sessionId = sessionManager.add({
    channelType: ChannelType.Tcp,
    channelOptions: {
        options: { port: 8889, host: "127.0.0.1" },
        filter: StringFilter,
    },
});
```

### UDP

```typescript
const sessionId = sessionManager.add({
    channelType: ChannelType.Udp,
    channelOptions: {
        options: { port: 8890, host: "127.0.0.1" },
        filter: StringFilter,
    },
});
```

### SerialPort

```typescript
const sessionId = sessionManager.add({
    channelType: ChannelType.Serial,
    channelOptions: {
        options: { path: "/dev/tty.usbserial-XXXX", baudRate: 115200, autoOpen: false },
        filter: StringFilter,
    },
});
```

### HID

```typescript
const sessionId = sessionManager.add({
    channelType: ChannelType.Hid,
    channelOptions: {
        options: "/dev/hidraw0",
        filter: StringFilter,
    },
});
```

### Cleaning up

```typescript
sessionManager.disconnect(sessionId); // close one session's channel and remove it
sessionManager.destroyAll();          // close and remove every session
```

---

## Framing / filters

Raw TCP and serial streams have no message boundaries, so consecutive writes
may be merged ("sticky packets") or split ("partial packets"). A `Filter`
turns the byte stream into application frames. `decodePackage` returns an array
of the complete frames found in a chunk, buffering any remainder internally.

- **`StringFilter`** — decodes incoming bytes to UTF-8 text. Multi-byte
  characters split across chunk boundaries are handled correctly. No framing;
  emits text as it arrives.
- **`DelimiterFilter`** — splits the stream on a delimiter (default `"\n"`) and
  only emits complete frames. Use this for line/record based protocols.

```typescript
import { DelimiterFilter } from "@sevenqi/nodechannel";

sessionManager.add({
    channelType: ChannelType.Tcp,
    channelOptions: {
        options: { port: 8889, host: "127.0.0.1" },
        // each "\n"-terminated record is delivered as one message
        filter: () => new DelimiterFilter("\n"),
    },
});
```

You can implement a custom protocol by implementing the `Filter` interface:

```typescript
import { Filter } from "@sevenqi/nodechannel";

class MyFilter implements Filter {
    decodePackage(buffer: Buffer): any[] {
        // return zero or more complete frames; buffer any remainder
        return [buffer];
    }
}
```

---

## Server usage

### TCP server

```typescript
import { SocketServer, StringFilter } from "@sevenqi/nodechannel";

const server = new SocketServer({ port: 8888, host: "0.0.0.0" }, StringFilter);
server.onServerData((message) => {
    console.log(message);
});
server.listen();

// broadcast to every connected client
server.sessions.forEach((session) => session.send(Buffer.from("hello")));
```

### WebSocket server

```typescript
import { WebSocketServer, StringFilter } from "@sevenqi/nodechannel";

const server = new WebSocketServer({ port: 8888 }, StringFilter);
server.onServerData((message) => {
    console.log(message);
});
server.listen();
```

### HTTP server

An HTTP listener that funnels every inbound request body to `onServerData` and
replies `200 OK`. `multipart/form-data` bodies are parsed and emitted as a JSON
string `{ fields, files }`; any other body is emitted as raw text, chunk by
chunk, as it arrives.

```typescript
import { HttpServer } from "@sevenqi/nodechannel";

const server = new HttpServer({ port: 8080 });
server.onServerData((message) => {
    console.log(message);
});
server.onError = (err) => console.error(err);
server.onListening = () => console.log("listening");
server.listen();
```

### UDP broadcast / listen client

A UDP client can bind a local port to receive datagrams and enable broadcast so
it can send to a broadcast address. Pass `localPort` (to receive) and
`broadcast: true` (to enable `SO_BROADCAST`) alongside the send target:

```typescript
const sessionId = sessionManager.add({
    channelType: ChannelType.Udp,
    channelOptions: {
        options: { host: "255.255.255.255", port: 1500, localPort: 9000, broadcast: true },
        filter: StringFilter,
    },
});
await sessionManager.connect(sessionId); // binds localPort + enables SO_BROADCAST
sessionManager.send(sessionId, Buffer.from("discover"));
```

---

## Development

```shell
yarn install
yarn build        # type-check + emit to dist/
yarn test         # run the test suite
yarn lint         # eslint
yarn format       # prettier --write
```
