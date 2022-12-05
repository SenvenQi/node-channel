import {Session, SessionConstructor } from "./session";
import {ChannelConstructor} from "./baseChannel";
import { Event } from "./session"

export interface ISessionManager{
    add(ctor:SessionConstructor,channel:ChannelConstructor,options:any): string
    remove(id:string):void
    send<T>(id:string,message:T):void
}

export class SessionManager implements ISessionManager{
    public sessions: Map<string,Session> = new Map<string, Session>();

    add(ctor:SessionConstructor,channel:ChannelConstructor,options:any,...channelArgs:any[]): string{
        const session = new ctor(new channel(...channelArgs),options);
        session.onClose = this.remove.bind(this)
        this.sessions.set(session.id,session)
        return session.id
    }

    remove(id:string): void {
        this.sessions.delete(id)
    }

    send<T>(id:string,message: T): void {
        this.sessions.get(id).send(message);
    }

    onData(id:string,func:Event<any>){
       this.sessions.get(id).onMessage = func
    }



    async connect(sessionId: string) {
        await this.sessions.get(sessionId).open()
    }
}
