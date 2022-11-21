import {Session, SessionConstructor } from "./session";
import {ChannelConstructor} from "./baseChannel";

export interface ISessionManager{
    add(ctor:SessionConstructor,channel:ChannelConstructor): string
    remove(id:string):void
    send<T>(id:string,message:T):void
}

export class SessionManager implements ISessionManager{
    private sessions: Map<string,Session> = new Map<string, Session>();

    add(ctor:SessionConstructor,channel:ChannelConstructor): string{
        const session = new ctor(new channel());
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
        await this.sessions.get(sessionId).open()
    }
}
