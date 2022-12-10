import {Duplex} from "stream"
import { Socket } from "dgram"
export class UdpDuplex extends Duplex{
    private udp:Socket
    private msg:string | Uint8Array | ReadonlyArray<any>
    private port?:number
    private address?:string
    constructor(udp:Socket) {
        super({ readableObjectMode: true });
        this.udp = udp;
        this.udp.on("message",(msg, rinfo)=>{
            this.push({msg:msg,rinfo:rinfo})
        })
    }

    _write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
        this.udp.send(chunk,this.port,this.address)
        callback()
    }
    _read(size: number) {
        this.resume()
    }

    connect(port: number, host: string, connectionListener?: () => void){
        this.port = port
        this.address = host
        this.udp.connect(port,host,connectionListener)
    }

    bind(port: number, host: string, connectionListener?: () => void){
        this.port = port
        this.address = host
        this.udp.bind(port,host,connectionListener)
    }
}
