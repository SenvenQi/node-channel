import {Session, SessionImpl} from "./session";
import {Duplex} from "stream";
import {Filter} from "./filter";

export interface ISessionManager{
    add<T extends Filter<R>,R>(duplex:Duplex): string
    remove(id:string):void
    send<T>(id:string,message:T):void
}

export class SessionManager implements ISessionManager{
    private sessions: Map<string,Session>;

    add<T extends Filter<R>,R>(duplex:Duplex): string{
        let session: Session;
        session = new SessionImpl(duplex);
        this.sessions.set(session.id,session)
        return session.id
    }

    remove(id:string): void {
        this.sessions.delete(id)
    }

    send<T>(id:string,message: T): void {
        this.sessions.get(id).send(message);
    }
}
