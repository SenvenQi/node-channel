import {Channel} from "../../channel";
import {Buffer} from "buffer";
import {Socket} from "net";
import PromiseSocket from "promise-socket";

export class TcpChannel implements Channel{
    private socket:PromiseSocket<Socket>

    constructor(socketTemp: PromiseSocket<Socket>) {
        this.socket = socketTemp
        this.socket.stream.on("data",(buffer)=>this.receive(buffer));
    }

    receive: (e:Buffer) => void

    async send(buffer): Promise<void>{
        await this.socket.write(buffer)
    }

}
