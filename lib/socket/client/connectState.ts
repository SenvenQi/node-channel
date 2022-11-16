import {Socket} from "net";
import {TcpChannel} from "./tcpChannel";

export class ConnectState{
    public socket:Socket

    constructor(socket:Socket) {
        this.socket = socket
    }

    createChannel() {
        const socketTemp = this.socket
        return new TcpChannel(socketTemp)
    }
}
