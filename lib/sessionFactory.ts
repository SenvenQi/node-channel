import {Channel, ChannelConstructor} from "./channel";
import {Session, SessionImpl} from "./session";


export function SessionFactory(ctor: ChannelConstructor<any>,args?:any[]):Session{
    const channel = new ctor(args);
    return new SessionImpl(channel)
}


