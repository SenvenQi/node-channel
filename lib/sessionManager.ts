import {Session} from "./session";
import {SessionFactory} from "./sessionFactory";
import { ChannelConstructor} from "./channel";

export interface ISessionManager{
    add<T>(ctor:ChannelConstructor<T>,options:T):string
    remove(id:string):void
    send<T>(id:string,message:T):void
}

export abstract class SessionManager implements ISessionManager{
    private sessions: Session[];

    add<T>(ctor:ChannelConstructor<any>,options:T): string{
        let session: Session;
        session = SessionFactory(ctor);
        this.sessions.push(session)
        return session.id
    }

    remove(id:string): void {
        this.sessions = this.sessions.filter(x=>x.id != id)
    }

    send<T>(id:string,message: T): void {
        this.sessions.find(x=>x.id == id).channel.send(message);
    }
}
