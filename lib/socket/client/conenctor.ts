import {Socket, SocketConstructorOpts} from "net";
import PromiseSocket from "promise-socket";
import {ConnectState} from "./connectState";

export class Connector {
    private readonly option:SocketConstructorOpts;

    constructor(option:SocketConstructorOpts) {
        this.option = option
    }

    async connect(ipEndpoint:string): Promise<ConnectState> {
        const promiseSocket = new PromiseSocket()
        promiseSocket.setTimeout(5000)
        await promiseSocket.connect(10001,ipEndpoint)
        return new ConnectState(promiseSocket);
    }
}
