import { Server, ServerOpts, Socket} from "net"
import {BaseAppServer} from "../../appServer";
import {SocketClient} from "./socketClient";
import { TcpChannel } from "./tcpChannel";
import {Filter} from "../../filter";
class SocketOptions {
    socketConstructorOpts?:ServerOpts
    port:number;
    host:string;
}


export class SocketServer  extends BaseAppServer{
    private socket:Server;
    private filter:new ()=>Filter
    constructor(option:SocketOptions,filter:new ()=>Filter) {
        super(SocketClient,TcpChannel)
        this.option = option;
        this.filter = filter;
    }

    state: boolean;
    option:SocketOptions;
    error(error:Error):void {
        console.log(error.message)
        this.socket?.close();
    }
    listen(): void {
        this.socket = new Server()
        this.socket.on("connection",(socket:Socket) => this.connection(socket,new this.filter()))
        // this.tcp.on("ready",this.onData)
        // this.tcp.on("timeout",this.onData)
        // this.tcp.on("end",this.onData)
        // this.tcp.on("close",this.onData)
        // this.tcp.on("data",this.onData.bind(this))
        this.socket.on("error",this.error.bind(this))
        // this.tcp.on("lookup",this.onData)
        // this.tcp.on("drain",this.onData)
        this.socket.listen(this.option.port,this.option.host);
    }

    disListen(): void {
        this.socket?.close();
    }
}
