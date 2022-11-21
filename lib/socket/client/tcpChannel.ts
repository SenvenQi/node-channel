import {Buffer} from "buffer";
import {Socket} from "net";
import {BaseChannel} from "../../baseChannel";

export class TcpChannel extends BaseChannel{
    constructor() {
        super(new Socket())
    }
    async connect(ipEndpoint:string): Promise<Boolean> {
        const socket = this.duplex as Socket;
        return  new Promise((resolve,reject)=>{
            const listener = (error)=>{
                console.log(error)
                reject(false)
            }
            socket.once("error",listener)
            socket.connect(10001,ipEndpoint,()=>{
                socket.removeListener("error",listener);
                resolve(true)
            });
        })
    }
}
