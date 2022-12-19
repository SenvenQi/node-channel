import {Duplex} from "stream";
import {WebSocket} from "ws";

export class WebSocketDuplex extends Duplex{
    private ws:WebSocket
    private msg:string | Uint8Array | ReadonlyArray<any>
    constructor(ws:WebSocket) {
        super({ readableObjectMode: true,writableObjectMode:true });
        this.ws = ws
        const $this = this;
        this.ws.on("message",(msg, isBinary)=>{
            $this.push(JSON.stringify({msg:msg,isBinary:isBinary}))
        })
        this.ws.on("close",()=>{
            console.log("websocket close")
        })
    }

    _write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
        this.ws.send(chunk)
        callback()
    }
    _read(size: number) {
        this.resume()
    }
    connect():Promise<Boolean>{
        return new Promise((resolve,reject)=>{
            const openListener = (error)=>{
                this.ws.removeListener("error",errorListener);
                resolve(true)
            }

            const errorListener =  (error)=>{
                this.ws.removeListener("open",openListener);
                console.log(error)
                reject(error)
            }
            this.ws.once("open",openListener);
            this.ws.once("error",errorListener)
        })

    }
}
