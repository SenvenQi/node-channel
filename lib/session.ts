import { v4 as uuid4 } from 'uuid';
import {Duplex} from "stream";


export interface Session{
    id:string
    channel:Duplex
    send<T>(message:T)
}


export class SessionImpl implements Session{
    channel: Duplex;
    id: string;

    constructor(channel:Duplex) {
        this.channel = channel
        this.id = uuid4()
    }

    send<T>(message: T) {
        this.channel.write(message)
    }
}
