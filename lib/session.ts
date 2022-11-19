import { v4 as uuid4 } from 'uuid';
import {Duplex} from "stream";


export interface Session{
    id:string
    channel:Duplex
    send<T>(message:T)
}

export interface Event<T> {
    (listener:T):void
}


export abstract class SessionImpl implements Session{
    channel: Duplex;
    id: string;
    onMessage:Event<any>= (buffer:any)=>{}

    constructor(channel:Duplex) {
        this.channel = channel
        this.id = uuid4()
        this.channel.on("data",this.onMessage)
    }

    send<T>(message: T) {
        this.channel.write(message)
    }
}
