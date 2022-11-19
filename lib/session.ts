import {Channel} from "./channel";
import { v4 as uuid4 } from 'uuid';

export interface SessionConstructor{
    new ( channel: Channel) : Session;
}

export interface Session{
    id:string
    channel:Channel
    send<T>(message:T)
}


export class SessionImpl implements Session{
    channel: Channel;
    id: string;

    constructor(channel:Channel) {
        this.channel = channel
        this.id = uuid4()
    }

    send<T>(message: T) {
        this.channel.send(message)
    }
}
