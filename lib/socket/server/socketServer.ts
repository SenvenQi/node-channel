import {Event} from "../../event";
import {Server, ServerOpts, Socket} from "net"
import { ServerChannel } from "../../server/serverChannel";

class SocketOptions {
    socketConstructorOpts:ServerOpts
    path:string;
}


class SocketChannel implements ServerChannel{

    private socket:Server;

    private socketClients:Socket[]
    constructor(option:SocketOptions) {
        this.option = option;
    }

    onData: Event<any>;
    state: boolean;
    option:SocketOptions;
    error(error:Error):void {
        console.log(error.message)
        this.socket?.close();
    }
    conection(socket:Socket):void{
        this.socketClients.push(socket)
    }
    listen(): void {
        this.socket = new Server(this.option.socketConstructorOpts)
        this.socket.on("connection",this.conection.bind(this))
        // this.socket.on("ready",this.onData)
        // this.socket.on("timeout",this.onData)
        // this.socket.on("end",this.onData)
        // this.socket.on("close",this.onData)
        // this.socket.on("data",this.onData.bind(this))
        this.socket.on("error",this.error.bind(this))
        // this.socket.on("lookup",this.onData)
        // this.socket.on("drain",this.onData)
        this.socket.listen(this.option.path);
    }

    disListen(): void {
        this.socket?.close();
    }
}
