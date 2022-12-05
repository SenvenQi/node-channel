import {Socket} from "net";
import {BaseChannel} from "../../baseChannel";
import {StringFilter} from "../../filter";

export class TcpChannel extends BaseChannel{
    constructor() {
        super(new Socket(),StringFilter)
    }
    async connect(ipEndpoint:string,port:number): Promise<Boolean> {
        const socket = this.duplex as Socket;
        return  new Promise((resolve,reject)=>{
            const listener = (error)=>{
                console.log(error)
                reject(false)
            }
            socket.once("error",listener)
            socket.connect(port,ipEndpoint,()=>{
                socket.removeListener("error",listener);
                resolve(true)
            });
        })
    }
}
