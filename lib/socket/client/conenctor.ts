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
            const listener = (error)=>{
                reject(error)
            }
            socket.once("error",listener)
            socket.connect(10001,ipEndpoint,()=>{
                socket.removeListener("error",listener);
                resolve(new ConnectState(socket))
            });
        })
    }
}
