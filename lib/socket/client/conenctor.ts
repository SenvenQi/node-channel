import {Socket, SocketConstructorOpts} from "net";
import {ConnectState} from "./connectState";

export class Connector {
    private readonly option:SocketConstructorOpts;

    constructor(option:SocketConstructorOpts) {
        this.option = option
    }

    connect(ipEndpoint:string): ConnectState {
        const socket = new Socket()
        socket.connect(10001, ipEndpoint)
        return new ConnectState(socket);
    }
}
