import { Server, ServerOpts, Socket} from "net"
import {BaseAppServer} from "../../appServer";
import {SocketClient} from "./socketClient";
import { TcpChannel } from "./tcpChannel";
class SocketOptions {
    socketConstructorOpts?:ServerOpts
    port:number;
    host:string;
}


export class SocketServer  extends BaseAppServer{
    private socket:Server;
    constructor(option:SocketOptions) {
        super(SocketClient,TcpChannel)
        this.option = option;
    }

    state: boolean;
    option:SocketOptions;
    error(error:Error):void {
        console.log(error.message)
        this.socket?.close();
    }
    listen(): void {
        this.socket = new Server()
        this.socket.on("connection",(socket:Socket) => this.connection(socket))
        // this.socket.on("ready",this.onData)
        // this.socket.on("timeout",this.onData)
        // this.socket.on("end",this.onData)
        // this.socket.on("close",this.onData)
        // this.socket.on("data",this.onData.bind(this))
        this.socket.on("error",this.error.bind(this))
        // this.socket.on("lookup",this.onData)
        // this.socket.on("drain",this.onData)
        this.socket.listen(this.option.port,this.option.host);
    }

    disListen(): void {
        this.socket?.close();
    }
}
