import { v4 as uuid4 } from 'uuid';
import {Duplex} from "stream";


export interface Session{
    id:string
    channel:Duplex
    send<T>(message:T)
    open(path:string)
}

export interface Event<T> {
    (listener:T):void
}

export interface SessionConstructor{
    new ( channel: Duplex) : Session;
}

export abstract class SessionImpl implements Session{
    channel: Duplex;
    id: string;
    onMessage:Event<any>= (buffer:any)=>{
        console.log(buffer)
    }

    constructor(channel:Duplex) {
        this.channel = channel
        this.id = uuid4()

    }

    send<T>(message: T) {
        this.channel.write(message)
    }

    abstract open(path:string)
}
