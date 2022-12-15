import {Socket} from "net";
import {BaseChannel} from "../../baseChannel";
import {Filter, StringFilter} from "../../filter";

export class TcpChannel extends BaseChannel{
    private readonly port:number;
    private readonly ipEndpoint:string;

    constructor(options:any,filter:Filter) {
        super(new Socket(),filter)
        this.port = options.port
        this.ipEndpoint = options.ipEndpoint
    }
    async connect(): Promise<boolean> {
        const socket = this.duplex as Socket;
        return  new Promise((resolve,reject)=>{
            const listener = (error)=>{
                console.log(error)
                reject(false)
            }
            socket.once("error",listener)
            socket.connect(this.port,this.ipEndpoint,()=>{
                socket.removeListener("error",listener);
                resolve(true)
            });
        })
    }
}
