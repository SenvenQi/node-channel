import {Socket} from "net";
import PromiseSocket from "promise-socket";
import {TcpChannel} from "./tcpChannel";

export class ConnectState{
    public socket:PromiseSocket<Socket>

    constructor(socket:PromiseSocket<Socket>) {
        this.socket = socket
    }

    createChannel() {
        const socketTemp = this.socket
        return new TcpChannel(socketTemp)
    }
}
