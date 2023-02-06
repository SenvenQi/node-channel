import {BaseAppServer} from "../../appServer";
import {WebSocketClient} from "./webSocketClient";
import {WebSocketChannel} from "./webSocketChannel";
import {ServerOptions, WebSocketServer as Server} from "ws";
import {WebSocketDuplex} from "../webSocketDuplex";
import {Filter} from "../../filter";

export class WebSocketServer extends BaseAppServer{
    private socket:Server;
    private filter:new ()=>Filter;
    constructor(option:ServerOptions,filter:new ()=>Filter) {
        super(WebSocketClient,WebSocketChannel)
        this.option = option;
        this.filter = filter;
    }

    state: boolean;
    option:ServerOptions;
    error(error:Error):void {
        console.log(error.message)
        this.socket?.close();
    }
    listen(): void {
        this.socket = new Server(this.option)
        this.socket.on("connection",(socket,request) => {
            this.connection(new WebSocketDuplex(socket),new this.filter())

        })
        // this.tcp.on("ready",this.onData)
        // this.tcp.on("timeout",this.onData)
        // this.tcp.on("end",this.onData)
        // this.tcp.on("close",this.onData)
        // this.tcp.on("data",this.onData.bind(this))
        this.socket.on("error",this.error.bind(this))
        // this.tcp.on("lookup",this.onData)
        // this.tcp.on("drain",this.onData)
    }

    disListen(): void {
        this.socket?.close();
    }
}
