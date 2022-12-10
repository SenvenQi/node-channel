import {Duplex} from "stream";
import {WebSocket} from "ws";

export class WebSocketDuplex extends Duplex{
    private ws:WebSocket
    private msg:string | Uint8Array | ReadonlyArray<any>
    constructor(ws:WebSocket) {
        super({ readableObjectMode: true });
        this.ws = ws
        this.ws.on("message",(msg, isBinary)=>{
            this.push({msg:msg,isBinary:isBinary})
        })
    }

    _write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
        this.ws.send(chunk,callback)
    }
    _read(size: number) {
        this.resume()
    }
}
