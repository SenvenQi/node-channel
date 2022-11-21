import { v4 as uuid4 } from 'uuid';
import {Duplex} from "stream";
import {BaseChannel} from "./baseChannel";
import {Filter} from "./filter";


export interface Session{
    id:string
    channel:Duplex
    send<T>(message:T)
    onMessage:Event<any>
    open()
}

export interface Event<T> {
    (listener:T):void
}

export interface SessionConstructor{
    new ( channel: BaseChannel,options:any) : Session;
}

export abstract class SessionImpl implements Session{
    channel: BaseChannel;
    options:any;
    id: string;
    onMessage:Event<any>= (buffer:any)=>{
        console.log(buffer)
    }

    constructor(channel:BaseChannel,options:any) {
        this.channel = channel
        this.options = options
        this.id = uuid4()

    }

    send<T>(message: T) {
        this.channel.send(message)
    }

    abstract open()
}
