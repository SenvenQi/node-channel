import { v4 as uuid4 } from 'uuid';
import {Duplex} from "stream";
import {BaseChannel} from "./baseChannel";


export interface Session{
    id:string
    channel:Duplex
    send<T>(message:T)
    open()
}

export interface Event<T> {
    (listener:T):void
}

export interface SessionConstructor{
    new ( channel: BaseChannel) : Session;
}

export abstract class SessionImpl implements Session{
    channel: BaseChannel;
    id: string;
    onMessage:Event<any>= (buffer:any)=>{
        console.log(buffer)
    }

    constructor(channel:BaseChannel) {
        this.channel = channel
        this.id = uuid4()

    }

    send<T>(message: T) {
        this.channel.send(message)
    }

    abstract open()
}
