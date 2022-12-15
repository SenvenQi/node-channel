import {createSocket, Socket} from "dgram";
import {BaseChannel} from "../../baseChannel";
import {Filter, StringFilter} from "../../filter";
import {UdpDuplex} from "../udpDuplex";

export class UdpChannel extends BaseChannel{
    private readonly port:number;
    private readonly host:string;

    constructor(options:any,filter:Filter) {
        super(new UdpDuplex(createSocket("udp4")),filter)
        this.port = options.port
        this.host = options.host
    }
    async connect(): Promise<boolean> {
        const socket = this.duplex as UdpDuplex;
        return  new Promise((resolve,reject)=>{
            // const listener = (error)=>{
            //     console.log(error)
            //     reject(false)
            // }
            // tcp.once("error",listener)
            socket.connect(this.port,this.host);
            resolve(true)
            // resolve(true)
        })
    }
}
