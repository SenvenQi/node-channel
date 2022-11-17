import {Socket, SocketConstructorOpts} from "net";
import {ConnectState} from "./connectState";
import {rejects} from "assert";

export class Connector {
    private readonly option:SocketConstructorOpts;

    constructor(option:SocketConstructorOpts) {
        this.option = option
    }

    async connect(ipEndpoint:string): Promise<ConnectState> {
        const socket = new Socket()
        return  new Promise((resolve,reject)=>{
            socket.once("error",(error)=>{
                reject(error)
            })
            socket.connect(10001,ipEndpoint,()=>resolve(new ConnectState(socket)));
        })
    }
}
