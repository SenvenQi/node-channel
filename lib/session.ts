import { v4 as uuid4 } from 'uuid';
import {Duplex} from "stream";
import {BaseChannel} from "./baseChannel";


export interface Session{
    onClose: Event<any>;
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
    onClose:Event<any> = () => {
        console.log("socket is closed!")
    }

    constructor(channel:BaseChannel,options:any) {
        this.channel = channel
        this.options = options
        this.id = uuid4()
        channel.onClose = () => this.onClose(this.id)
    }

    send<T>(message: T) {
        this.channel.send(message)
    }

    open():void{

    }
}
