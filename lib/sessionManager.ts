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
       if (!sessionOption)
           throw new Error(`Unsupported channel type: ${sessionOptions.channelType}`)
       return this.addSession(sessionOption.session,
           sessionOption.channel,
           [sessionOptions.channelOptions.options,sessionOptions.channelOptions.filter])
    }
    private addSession(ctor:SessionClientConstructor,channel:ChannelConstructor,channelArgs:any[]): string{
        const session = new ctor(channel,channelArgs);
        // Reclaim the session once the underlying channel closes so we
        // don't leak sessions (and their sockets) for the lifetime of
        // the process.
        session.onClose = (id:string) => this.remove(id);
        this.sessions.set(session.id,session)
        return session.id
    }

    private getOrThrow(id:string):Session{
        const session = this.sessions.get(id)
        if (!session)
            throw new Error(`No session found for id: ${id}`)
        return session
    }

    remove(id:string): void {
        this.sessions.delete(id)
    }

    /**
     * Actively close a session's channel and remove it. Use this for
     * graceful client shutdown; `remove` only drops the bookkeeping.
     */
    disconnect(id:string): void {
        const session = this.sessions.get(id)
        if (!session)
            return
        const channel = session.channel as unknown as { close?: () => void }
        channel.close?.()
        this.sessions.delete(id)
    }

    /** Close and remove every session. */
    destroyAll(): void {
        for (const id of Array.from(this.sessions.keys()))
            this.disconnect(id)
    }

    send<T>(id:string,message: T): void {
        this.getOrThrow(id).send(message);
    }

    onDataAll(func:Event<any>){
       this.sessions.forEach(session=>{
           session.onMessage = func
       })
    }
    onData(id:string,func:Event<any>){
       this.getOrThrow(id).onMessage = func
    }

    connect(sessionId: string): Promise<boolean> {
        const session = this.sessions.get(sessionId)
        if (session && session instanceof SessionClient)
            return (session as SessionClient).openChannel()
        else
            throw new Error("SessionServer not support connect")
    }
}
