import {Socket, SocketConstructorOpts} from "net";
import PromiseSocket from "promise-socket";
import {ConnectState} from "./connectState";

export class Connector {
    private readonly option:SocketConstructorOpts;

    constructor(option:SocketConstructorOpts) {
        this.option = option
    }

    async connect(ipEndpoint:string): Promise<ConnectState> {
        const socket = new Socket(this.option)
        const promiseSocket = new PromiseSocket(socket)
        await promiseSocket.connect(ipEndpoint)
        return new ConnectState();
    }
}
