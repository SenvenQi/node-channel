import {Session, SessionImpl} from "./session";
import {SocketClient} from "./socket/client/socketClient";
import {SessionFactory} from "./sessionFactory";

export interface ServerChannelManager {
    listen(): void

    disListen(): void

    state: boolean
}

export abstract class ServerChannelManagerImpl implements ServerChannelManager{
    private sessions: Session[];

    add<T>(options:T): string{
        const session = SessionFactory(SessionImpl,[])
        this.sessions.push(session)
        return session.id
    }

    remove(id:string): void {
        this.sessions = this.sessions.filter(x=>x.id != id)
    }

    send<T>(id:string,message: T): void {
        this.sessions.find(x=>x.id == id).channel.send(message);
    }

    abstract state: boolean;

    abstract disListen(): void;

    abstract listen(): void;
}
