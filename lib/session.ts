import { v4 as uuid4 } from 'uuid';
import {Duplex} from "stream";
import {BaseChannel, ChannelConstructor} from "./baseChannel";


export interface Session{
    onClose: Event<any>;
    id:string
    channel:Duplex
    send<T>(message:T):void
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
    id: string;
    onMessage:Event<any>= (buffer:any)=>{
        console.log(buffer)
    }
    onClose:Event<any> = () => {
        console.log("channel is closed!")
    }
    protected constructor(channel:BaseChannel) {
        this.channel = channel;
        this.id = uuid4()
        this.channel.onClose = () => this.onClose(this.id)
    }

    send<T>(message: T): void {
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
        console.log("channel is closed!")
    }

    protected constructor(channelCtor:ChannelConstructor, args:any[]) {
        this.channelCtor = channelCtor;
        this.args = args;
        this.id = uuid4()
    }

    send<T>(message: T): void {
        this.channel.send(message)
    }

    /**
     * Open the underlying channel's transport. Channels expose an optional
     * async `connect()`; if absent the transport is considered ready.
     * Shared by every protocol client so the connect/open flow lives in
     * one place instead of being copy-pasted per transport.
     */
    async connect(): Promise<boolean> {
        const channel = this.channel as unknown as { connect?: () => Promise<boolean | Boolean> };
        try {
            if (typeof channel.connect === "function")
                return (await channel.connect()) !== false;
            return true;
        } catch (e) {
            return false;
        }
    }

    async open(): Promise<boolean> {
        if (await this.connect()) {
            this.channel.on("data", (data: any) => this.onMessage(data));
            return true;
        }
        return false;
    }

    openChannel(): Promise<boolean> {
        this.channel = new this.channelCtor(...this.args);
        this.channel.onClose = () => this.onClose(this.id)
        return this.open();
    }
}
