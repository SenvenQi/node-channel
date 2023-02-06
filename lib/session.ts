import { v4 as uuid4 } from 'uuid';
import {Duplex} from "stream";
import {BaseChannel, ChannelConstructor} from "./baseChannel";


export interface Session{
    onClose: Event<any>;
    id:string
    channel:Duplex
    send<T>(message:T)
    onMessage:Event<any>
}

export interface Event<T> {
    (listener:T):void
}

export interface SessionConstructor{
    new ( channel: BaseChannel,callback?:Event<any>) : Session;
}

export interface SessionClientConstructor{
    new (channelCtor:ChannelConstructor, args:any[]):Session
}

export abstract class SessionServer implements Session{
    channel: BaseChannel;
    private readonly channelCtor:ChannelConstructor;
    private readonly args:[];
    id: string;
    onMessage:Event<any>= (buffer:any)=>{
        console.log(buffer)
    }
    onClose:Event<any> = () => {
        console.log("tcp is closed!")
    }
    protected constructor(channel:BaseChannel) {
        this.channel = channel;
        this.id = uuid4()
        this.channel.onClose = () => this.onClose(this.id)
    }

    send<T>(message: T) {
        this.channel.send(message)
    }



}


export abstract class SessionClient implements Session {
    channel: BaseChannel;
    private readonly channelCtor:ChannelConstructor;
    private readonly args:any[];
    id: string;
    onMessage:Event<any>= (buffer:any)=>{
        console.log(buffer)
    }
    onClose:Event<any> = () => {
        console.log("tcp is closed!")
    }

    protected constructor(channelCtor:ChannelConstructor, args:any[]) {
        this.channelCtor = channelCtor;
        this.args = args;
        this.id = uuid4()
    }

    send<T>(message: T) {
        this.channel.send(message)
    }

    openChannel(): Promise<boolean> {
        this.channel = new this.channelCtor(...this.args);
        this.channel.onClose = () => this.onClose(this.id)
        return this.open();
    }
    abstract open():Promise<boolean>;
}
