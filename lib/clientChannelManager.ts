import {Session} from "./session";

export interface ClientChannelManager{
    sessions:Session[]
    add<T>(options:T):void
    remove(id:string):void
}

export class ClientChannelManagerImpl implements ClientChannelManager{
    sessions: Session[];

    add<T>(options:T): void {
    }

    remove(id:string): void {
        this.sessions = this.sessions.filter(x=>x.id != id)
    }

}
