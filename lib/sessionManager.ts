import {Session, SessionConstructor } from "./session";
import {Duplex} from "stream";
import {BaseChannel} from "./baseChannel";

export interface ISessionManager{
    add(ctor:SessionConstructor,duplex:Duplex): string
    remove(id:string):void
    send<T>(id:string,message:T):void
}

export class SessionManager implements ISessionManager{
    private sessions: Map<string,Session> = new Map<string, Session>();

    add(ctor:SessionConstructor,channel:BaseChannel): string{
        const session = new ctor(channel);
        this.sessions.set(session.id,session)
        return session.id
    }

    remove(id:string): void {
        this.sessions.delete(id)
    }

    send<T>(id:string,message: T): void {
        this.sessions.get(id).send(message);
    }

    async connect(sessionId: string) {
        await this.sessions.get(sessionId).open("192.168.1.60")
    }
}
