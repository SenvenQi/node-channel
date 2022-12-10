import {BaseChannel} from "../../baseChannel";
import {StringFilter} from "../../filter";
import  { WebSocket , WebSocketServer } from 'ws';
import {WebSocketDuplex} from "../webSocketDuplex";

export class WebSocketChannel extends BaseChannel{
   private readonly port:number;
    private readonly ipEndpoint:string;

    constructor(options:any) {
        super(new WebSocketDuplex(new WebSocket(options.address)),StringFilter)
        this.port = options.port
        this.ipEndpoint = options.ipEndpoint
    }
    async connect(): Promise<Boolean> {
        const socket = this.duplex as WebSocketDuplex;
        return  new Promise((resolve,reject)=>{
            const listener = (error)=>{
                console.log(error)
                reject(false)
            }
            socket.once("error",listener)
            resolve(true)
        })
    }
}
