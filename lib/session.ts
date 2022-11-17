import {Channel} from "./channel";
import { v4 as uuid4 } from 'uuid';

export interface Session{
    id:string
    channel:Channel
}


export class SessionImpl implements Session {
    channel: Channel;
    id: string;

    constructor(channel:Channel) {
        this.channel = channel
        this.id = uuid4()
    }
}
