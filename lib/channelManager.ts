import {Session, SessionImpl} from "./session";
import {SocketClient} from "./socket/client/socketClient";

export interface ISessionManager{
    add<T>(options:T):string
    remove(id:string):void
    send<T>(id:string,message:T):void
}

export abstract class SessionManager implements ISessionManager{
    private sessions: Session[];

    add<T>(options:T): string{
        const session = new SessionImpl(new SocketClient())
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
