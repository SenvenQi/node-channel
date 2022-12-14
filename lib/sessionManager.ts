import {Session, SessionClient, SessionClientConstructor, SessionConstructor, SessionServer} from "./session";
import {ChannelConstructor} from "./baseChannel";
import { Event } from "./session"
import {ClientArgs, Config} from "./config";




export interface ISessionManager{
    add<T>(sessionOptions:ClientArgs<T>): string
    remove(id:string):void
    send<T>(id:string,message:T):void
}

export class SessionManager implements ISessionManager{
    public sessions: Map<string,Session> = new Map<string, Session>();

    add<T>(sessionOptions:ClientArgs<T>):string{
       const sessionOption = Config.getClientOptions(sessionOptions.channelType)
       return this.addSession(sessionOption.session,
           sessionOption.channel,
           [sessionOptions.channelOptions.options,sessionOptions.channelOptions.filter])
    }
    private addSession(ctor:SessionClientConstructor,channel:ChannelConstructor,channelArgs:any[]): string{
        const session = new ctor(channel,channelArgs);
        // session.onClose = this.remove.bind(this)
        this.sessions.set(session.id,session)
        return session.id
    }

    remove(id:string): void {
        this.sessions.delete(id)
    }

    send<T>(id:string,message: T): void {
        this.sessions.get(id).send(message);
    }

    onDataAll(func:Event<any>){
       this.sessions.forEach(session=>{
           session.onMessage = func
       })
    }
    onData(id:string,func:Event<any>){
       this.sessions.get(id).onMessage = func
    }

    connect(sessionId: string) {
        if (this.sessions.get(sessionId) && this.sessions.get(sessionId) instanceof SessionClient)
            return (this.sessions.get(sessionId) as SessionClient).openChannel()
        else
            throw new Error("SessionServer not support connect")
    }
}
