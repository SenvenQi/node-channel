import {Session, SessionImpl} from "./session";
import {Duplex} from "stream";
import {SocketClient} from "./socket/client/socketClient";

export interface ISessionManager{
    add(duplex:Duplex): string
    remove(id:string):void
    send<T>(id:string,message:T):void
}

export class SessionManager implements ISessionManager{
    private sessions: Map<string,Session>;

    add(duplex:Duplex): string{
        const session = new SocketClient(duplex);
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
