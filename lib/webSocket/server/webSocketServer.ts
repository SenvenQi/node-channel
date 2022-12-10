import {BaseAppServer} from "../../appServer";
import {WebSocketClient} from "./webSocketClient";
import {WebSocketChannel} from "./webSocketChannel";
import {ServerOptions, WebSocketServer as Server} from "ws";
import {WebSocketDuplex} from "../webSocketDuplex";

class SocketOptions {
    socketConstructorOpts?:ServerOptions
    path:string;
}


export class WebSocketServer extends BaseAppServer{
    private socket:Server;

    constructor(option:SocketOptions) {
        super(WebSocketClient,WebSocketChannel)
        this.option = option;
    }

    state: boolean;
    option:SocketOptions;
    error(error:Error):void {
        console.log(error.message)
        this.socket?.close();
    }
    listen(): void {
        this.socket = new Server({port:9000})
        this.socket.on("connection",(socket,request) => this.connection(new WebSocketDuplex(socket)))
        // this.socket.on("ready",this.onData)
        // this.socket.on("timeout",this.onData)
        // this.socket.on("end",this.onData)
        // this.socket.on("close",this.onData)
        // this.socket.on("data",this.onData.bind(this))
        this.socket.on("error",this.error.bind(this))
        // this.socket.on("lookup",this.onData)
        // this.socket.on("drain",this.onData)
    }

    disListen(): void {
        this.socket?.close();
    }
}
