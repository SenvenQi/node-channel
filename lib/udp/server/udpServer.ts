import {BindOptions, createSocket, Socket} from "dgram"
import {BaseAppServer} from "../../appServer";
import {UdpClient} from "./udpClient";
import { UdpChannel } from "./udpChannel";
import {UdpDuplex} from "../udpDuplex";


export class UdpServer extends BaseAppServer{
    private socket:Socket;
    private udpDuplex:UdpDuplex;
    constructor(option:BindOptions) {
        super(UdpClient,UdpChannel)
        this.option = option;
    }

    state: boolean;
    option:BindOptions;
    error(error:Error):void {
        console.log(error.message)
        this.socket?.close();
    }
    listen(): void {
        this.socket = createSocket("udp4")
        this.udpDuplex = new UdpDuplex(this.socket)
        // this.socket.on("ready",this.onData)
        // this.socket.on("timeout",this.onData)
        // this.socket.on("end",this.onData)
        // this.socket.on("close",this.onData)
        this.socket.on("message",(msg, rinfo) => this.connection(this.udpDuplex))
        this.socket.on("error",this.error.bind(this))
        // this.socket.on("lookup",this.onData)
        // this.socket.on("drain",this.onData)
        this.socket.bind(this.option);
    }

    disListen(): void {
        this.socket?.close();
    }
}
